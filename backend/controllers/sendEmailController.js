const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'viajar.appweb@gmail.com', //Tu cuenta de gmail
    pass: 'kpaajaruphpjseks​' //Aqui va la contraseña que generamos en el paso anterior de gmail
  }
});

const mailOptions = {
  from: 'viajar.appweb@gmail.com', //tu cuenta de gmail
  to: 'caarolinamendez.94@gmail.com', //Un ejemplo de correo al que quieres que llegue tu email
  subject: 'Correo de prueba desde Node', //Cabecera
  text: '¡Hola!' //texto a enviar
};

console.info('Enviando correo ...')
transporter.sendMail(mailOptions, (error, info)=> {
if (error) {
console.log(error);
} else {
console.log('Enviado! ' + info.response);

}
});
