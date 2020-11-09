initializePayments = () => {
    let ss = SpreadsheetApp.getActive(),
        sheetN = "LOTE GENERAL",
        sheet = ss.getSheetByName(sheetN),
        data = sheet.getDataRange().getValues(),
        FR = 1,
        LR = sheet.getLastRow()-1;
    
        
    for(let i = 1; i < data.length; i++){
        let row = data[i]
        sheet.getRange(i+1,27).setValue("")
        sheet.getRange(i+1,25).setNumberFormat('dd MM yyyy');
        sheet.getRange(i+1,26).setNumberFormat('dd MM yyyy');
    }
}

converDateStringToNewDate = ( dateString ) => {
    let splittedString = dateString.split('/')
    return new Date( splittedString[2], splittedString[1]+1, splittedString[0] )
}

function myFunction() {
    initializePayments()
    let ss = SpreadsheetApp.getActive(),
        sheetN = "LOTE GENERAL",
        sheet = ss.getSheetByName(sheetN),
        data = sheet.getDataRange().getValues(),
        FR = 1,
        LR = sheet.getLastRow()-1;

    for(let i = 1; i < data.length; i++){
        let row = data[i]
        let plaza = row[23]  // La columna W plaza
        // save the date
        let start_date = row[25]
        let end_date   = row[26]
        start_date = converDateStringToNewDate( start_date )    //Parse toa  Date format
        end_date = converDateStringToNewDate( end_date )        //Parse toa  date format
        //Logger.log("USER: ",plaza, start_date, end_date)
        //Logger.log(sheet.getRange(i,26).getValues())
        for(let j = 1; j < data.length; j++){
            if( i != j ){
                let comp_row  = data[j]
                let comp_user = comp_row[23]    
                if( plaza == comp_user ){
                    let start_date_comp = comp_row[25]
                    let end_date_comp   = comp_row[26]
                    start_date_comp = converDateStringToNewDate( start_date_comp )  //Parse toa  Date format
                    end_date_comp   = converDateStringToNewDate( end_date_comp )    //Parse toa  Date format
                    // Tenemos que checar si se cruzan sus fechas
                    if( start_date_comp <= end_date && start_date_comp >= start_date ){
                    //data[j][21]="Fuego cruzado"
                    Logger.log("fuego cruzado")
                        // Se cruzan jaja está en spanglish
                        // sheet.getRange(21,row).setValue("PAGO CRUZADO")
                        //sheet.getRange(21,comp_row).setValue("PAGO CRUZADO")
                        Logger.log(i+ " " + j);
                        sheet.getRange(i+1,27).setValue("PAGO CRUZADO")
                        sheet.getRange(j+1,27).setValue("PAGO CRUZADO")
                    }
                }
            }
        }
    }
}

function onOpen(){
    myFunction();
}