function onDownload(selectedAccount, statementDate) {
    pushEvents('CTA Web Link', 'Make bank payment: View current bill');
    this.accountAdditionalService.getStatementPDF(selectedAccount, statementDate).subscribe(res => {
      const fileSource = 'data:application/pdf;base64,' + res;
      let fileName = `OnlineBill${Math.round((Math.random() * 9 + 1) * Math.pow(10, 10 - 1))}.pdf`;
      if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
        var byteCharacters = atob(res);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'application/pdf' });
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      }
      else { // much easier if not IE
        var fileLink = document.createElement('a');
        fileLink.href = fileSource;
        fileLink.download = fileName;
        fileLink.click();
        fileLink.addEventListener('onclick', () => {
          setTimeout(() => {
            document.removeChild(fileLink);
          }, 2000);
        });
      }
    },
      err => {
        // console.log('Error: ', err);
        this.dialog.open(PdfDownloadDialog, { width: '400px', hasBackdrop: true, disableClose: true });
      });
  }
  
  function loadJSON() {
	  var mydata = JSON.parse(data);
	  console.log(JSON.stringify(mydata));
	  const fileSource = 'data:application/pdf;base64,' + mydata.getStatementPDFResponseBody.PDFContent;
	  console.log("fileSource: "+fileSource);
	  let fileName = `OnlineBill${Math.round((Math.random() * 9 + 1) * Math.pow(10, 10 - 1))}.pdf`;
	  var fileLink = document.createElement('a');
        fileLink.href = fileSource;
		//fileLink.target="_new"
        fileLink.download = fileName;
        fileLink.click();
        fileLink.addEventListener('onclick', () => {
          setTimeout(() => {
            document.removeChild(fileLink);
          }, 2000);
        });
	//alert("Hi "+fileName);
  }
  
  
    function openPDF() {
		 var mydata = JSON.parse(data);
	  console.log(JSON.stringify(mydata));
	  const fileSource = 'data:application/pdf;base64,' + mydata.getStatementPDFResponseBody.PDFContent;
	  
		var html = '<html>' +
            '<style>html,body {padding:0;margin:0;} iframe {width:100%;height:100%;border:0}</style>' +
            '<body>' +                                
            '<iframe type="application/pdf" src="' +  fileSource + '"></iframe>' +
            '</body></html>';
    var a = window.open("about:blank", "Report")
    a.document.write(html)
    a.document.close()
	
  }