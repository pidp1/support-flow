const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const nodemailer = require('nodemailer')

initializeApp();

const auth = getAuth();
const db = getFirestore();

exports.createUser = functions.https.onCall(async (data, context) => {
    const { email, password, displayName, photoURL, accessLevel, telefone, cpf } = data;
    const user = { email, password, displayName, photoURL };
    const customClaims = { accessLevel, telefone, cpf };
    console.log("chegou na cloud functions")
    await auth
        .createUser(user)
        .then((userRecord) => {
            functions.logger.log('Successfully created new user:', userRecord.uid);
            auth.setCustomUserClaims(userRecord.uid, customClaims);
            db.collection('users').doc(userRecord.uid).set({ email, displayName, photoURL, accessLevel, telefone, cpf, id: userRecord.uid })
        })
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soulcodeteste123@gmail.com',
        pass: 'yhqslhchpvaranrp'
    },

})

exports.sendEmailNotification = functions.https.onCall((data, context)=>{

       
        transporter.verify((error, sucess)=>{
            if(error){
                functions.logger.error("Erro ao conectar com servidor.", error)
            }else{
                functions.logger.info("Servidor conectado.")
            }
        })
    
        const mailOptions = {
            from: "soulcodeteste123@gmail.com",
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        }
    
        return transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                functions.logger.log("Erro ao enviar email.", error)
            }else{
                functions.logger.log("Email enviado com sucesso.", info)
            }
        })



   
})