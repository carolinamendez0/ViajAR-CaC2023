const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateTicket(req, res) {

  const ticketData=JSON.parse((req.body.paquetesjson))
  const paqueteData=ticketData.paquetes
  const destinoData=ticketData.destinos
  const userData=JSON.parse((req.body.usuJson))

  console.log(paqueteData);
  try {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const page = pdfDoc.addPage([600, 400]);
    const backgroundColor = rgb(0.95, 0.95, 0.95); // Color de fondo gris claro
    page.drawRectangle({
      x: 0,
      y: 0,
      width: 600,
      height: 400,
      color: backgroundColor,
    });

    // Agregar logo
    const imagePath = path.join(__dirname, '../../frontend/public/img/Logos/Logotipo2.png');
    // Leer los bytes de la imagen
    const logoBytes = fs.readFileSync(imagePath);
    // Insertar la imagen en el PDF
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(0.5);
    page.drawImage(logoImage, {
      x: 600 / 2 - logoDims.width / 2,
      y: 400 - logoDims.height - 50,
      width: logoDims.width,
      height: logoDims.height,
    });
    // Add text to PDF
    // page.drawText(`Ticket for ${usuarioNombre} ${usuarioApellido}`, { x: 50, y: 350, size: 20 });
        page.drawText("PAQUETE:", { x: 50, y: 300, size: 15, font: helveticaBoldFont, color: rgb(0, 0.53, 0.71) });
        page.drawText("DESCRIPCIÓN:", { x: 50, y: 270, size: 15,font: helveticaBoldFont, color: rgb(0, 0.53, 0.71)});
        page.drawText("DESTINO:", { x: 50, y: 240, size: 15,font: helveticaBoldFont, color: rgb(0, 0.53, 0.71)});
        page.drawText("PRECIO:", { x: 50, y: 210, size: 15,font: helveticaBoldFont, color: rgb(0, 0.53, 0.71)});
        page.drawText(`${paqueteData.titulo_paquete}`, { x: 130, y: 300, size: 12,font: timesRomanFont });
        page.drawText(`${paqueteData.descripcion_paquete}`, { x: 170, y: 270, size: 12,font: timesRomanFont });
        page.drawText(`${destinoData.titulo_destino}`, { x: 130, y: 240, size: 12,font: timesRomanFont });
        page.drawText(`$${paqueteData.precio_paquete}`, { x: 130, y: 210, size: 12,font: timesRomanFont });
        // Datos del Usuario 
        page.drawText("NOMBRE:", { x: 50, y: 180, size: 15,font: helveticaBoldFont, color: rgb(0, 0.53, 0.71)});
        page.drawText("APELLIDO:", { x: 50, y: 150, size: 15,font: helveticaBoldFont, color: rgb(0, 0.53, 0.71)});

        page.drawText(`${userData.nombre}`, { x: 130, y: 180, size: 12, font: timesRomanFont });
        page.drawText(`${userData.apellido}`, { x: 140, y: 150, size: 12, font: timesRomanFont });
      

        // Generate QR Code
        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Disposition', 'attachment; filename=ticket.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
    
}


module.exports= {generateTicket}

