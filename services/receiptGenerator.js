var pdf = require("pdf-creator-node");
const path = require('path')
var fs = require("fs");

var options = {
    width: "80mm",
    orientation: "portrait",
};

exports.generaterReceipt = async function (receipt, onSuccess, onFailure) {
    var html = fs.readFileSync(path.resolve(__dirname, 'receipt', 'template.html'), "utf8");
    var document = {
        html: html,
        data: { receipt },
        path: path.resolve(__dirname, 'receipt', `${receipt.restaurantId}_${receipt.orderNumber}.pdf`),
        type: "pdf",
    };
    pdf.create(document, options)
        .then((file) => {
            console.log(file);
            return onSuccess(file)
        })
        .catch((error) => {
            console.log(error.message);
            return onFailure(error)
        });
}