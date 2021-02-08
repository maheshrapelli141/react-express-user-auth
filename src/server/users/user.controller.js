const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('./user.model');
const config = require('../../config');
const path = require('path');

module.exports = {
  register: async (req, res, next) => {
    const fields = req.body;
    const { files } = req;
    
    try {
      if (!fields.email || !fields.firstname || !fields.lastname || !fields.password) {
        return res.status(400).json({
          message: 'All fields are required.',
          status: 'error'
        });
      }
      if (!files || !files.avatar) 
        return res.status(400).json({status:'error',message:'Avatar file required.'});
      
      const filenameArray = files.avatar.name.split('.');
      const ext = filenameArray[filenameArray.length - 1];
      if(!['jpg','jpeg','png'].includes(ext.toLowerCase()))
        return res.status(400).json({status:'error',message:'Invalid file format.'});

      if(files.avatar.size > 1000000)
        return res.status(400).json({status:'error',message:'File size too large.'});


      let filename = '_avatar_' + Math.floor(new Date() / 1000) + files.avatar.name.substr(files.avatar.name.length - 100);
      const filepath = path.resolve('./','uploads');
      
      fields.avatar =  filename.replace(/\s/g, '');

      await new Promise((resolve,reject) => files.avatar.mv(filepath +'/'+ fields.avatar,err => {
        console.log({err});
        if(err) return reject(err);
        return resolve(true);
      }));
      
      return await bcrypt.genSalt(10, async function (err, salt) {
        if (err)
          return res.status(500).json({ status: 'error', message: 'Something went wrong', err });
        return await bcrypt.hash(fields.password, salt, async function (err, hash) {
          if (err)
            return res.status(422).json({ status: 'error', message: 'Something went wrong', err });
          fields.password = hash;
          const savable = new Users(fields);
          const saved = await savable.save();
          return res.status(200).json({ status: "success", message: "User Registration Successful", data: saved });
        });
      });
    }
    catch (e) {
      console.log(e);
      return res.status(500).json({ status: 'error', message: e.message });
    }
  },
  login: async (req, res) => {
    const fields = req.body;
    try {
      if (!fields.email || !fields.password) {
        return res.status(400).json({
          status: 'error',
          message: 'All fields are required.',
        });
      }
      const user = await Users.findOne({ email: fields.email });
      
      if (!user)
        return res.status(400).json({ status: 'error', message: 'User Not Found' });
        
      bcrypt.compare(fields.password,user.password, function (error, isMatch) {
        if (error)
          return res.status(500).json({ status: 'error', message: error.message });


        if (isMatch) {

          let user1 = {
            _id: user._id,
            email: user.email,
            password: user.password,
          };

          const token = jwt.sign(user1, config.JWT.secret, { expiresIn: config.JWT.expire });
          const userData = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            avatar: 'http://'+req.headers.host + '/uploads/' + user.avatar
          };

          return res.status(200).json({
            status: 'success',
            message: 'Login Successful',
            token: token,
            data: userData,
          });
        } else
          return res.status(401).json({ status: 'error', message: 'Wrong Password' });
      }
      );
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: 'error', message: e.message });
    }
  },
  update: async (req,res) => {
    const fields = req.body;
    const { files } = req;

    try {
      if (!fields.firstname || !fields.lastname) {
        return res.status(400).json({
          message: 'All fields are required.',
          status: 'error'
        });
      }
      if (files && !files.avatar) 
        return res.status(400).json({status:'error',message:'Avatar file required.'});
      
      if(files && files.avatar){
        let filename = '_avatar_' + Math.floor(new Date() / 1000) + files.avatar.name.substr(files.avatar.name.length - 100);
        const filepath = path.resolve('./','uploads');
        fields.avatar =  filename.replace(/\s/g, '');

        await new Promise((resolve,reject) => files.avatar.mv(filepath +'/'+ fields.avatar,err => {
          console.log({err});
          if(err) return reject(err);
          return resolve(true);
        }));
      }

      delete fields.password;
      delete fields.email;

      const updatedData = await Users.findByIdAndUpdate(req.user._id,{ $set: fields },{ safe: true, new: true });
      const doc = updatedData._doc;
      doc.avatar = 'http://'+req.headers.host+ '/uploads/'+doc.avatar;
      return res
        .status(200)
        .json({ 
          status: "success",
          message: "Updated Successfully",
          data: doc });
      
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: 'error', message: e.message });
    }
  }
}
