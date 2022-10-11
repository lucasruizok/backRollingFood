const multer = require('multer');
//aqui crea una instancia de multer para poder guardar el archivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/imgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.png`)
    }
  });
  
  const upload = multer({ storage });

  module.exports = upload;