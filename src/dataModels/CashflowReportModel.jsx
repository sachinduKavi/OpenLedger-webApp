class CashflowReportModel {
    #reportID 
    #treasuryID
    #insuranceDate
    #documentType
    #rangeStart
    #rangeEnd
    #incomeArray
    #expenseArray
    #status 

    constructor({reportID = 'AUTO', treasuryID = null, insuranceDate = null, documentType = null, rangeStart = null, rangeEnd = null, incomeArray = [], status = null, expenseArray = []}) {
        this.#reportID = reportID,
        this.#treasuryID = treasuryID,
        this.#insuranceDate = insuranceDate
        this.#documentType = documentType
        this.#rangeStart = rangeStart
        this.#rangeEnd = rangeEnd
        this.#incomeArray = incomeArray
        this.#expenseArray = expenseArray
        this.#status = status

        if (this.#incomeArray.length > 0 && !isClassObject(this.#incomeArray[0])) this.#convertToLedgerEvidenceIncome()
        if (this.#expenseArray.length > 0 && !isClassObject(this.#expenseArray[0])) this.#convertToLedgerEvidenceExpense()
    }

    extractJSON() {
        return {
            reportID: this.#reportID,
            treasuryID:  this.#treasuryID,
            insuranceDate: this.#insuranceDate,
            documentType: this.#documentType,
            rangeStart: this.#rangeStart,
            rangeEnd: this.#rangeEnd,
            status: this.#status,
            incomeArray: this.#incomeArray.map(element => {
                return element.extractJSON()
            }),
            expenseArray: this.#expenseArray.map(element => {
                return element.extractJSON()
            })
        }
    }

    #convertToLedgerEvidenceIncome() {
        let tempObjectArray = []
        this.#incomeArray.forEach(element => {
            tempObjectArray.push(new LedgerRecord(element))
        });
        this.#incomeArray = tempObjectArray
    }

    #convertToLedgerEvidenceExpense() {
        let tempObjectArray = []
        this.#expenseArray.forEach(element => {
            tempObjectArray.push(new LedgerRecord(element))
        });
        this.#expenseArray = tempObjectArray
    }


    // Getters and Setters
    getStatus() {
        return this.#status
    }

    setStatus(status) {
        this.#status = status
    }

    getIncomeArray() {
        return this.#incomeArray
    }

    setIncomeArray(incomeArray) {
        this.#incomeArray = incomeArray
    }

    getExpenseArray() {
        return this.#expenseArray
    }

    setExpenseArray(expenseArray) {
        this.#expenseArray = expenseArray
    }


    getReportID() {
        return this.#reportID
    }

    setReportID(reportID) {
        this.#reportID = reportID
    }

    getTreasuryID() {
        return this.#treasuryID
    }

    setTreasuryID(treasuryID) {
        this.#treasuryID = treasuryID
    }

    getInsuranceDate() {
        return this.#insuranceDate
    }

    setInsuranceDate(insuranceDate) {
        this.#insuranceDate = insuranceDate
    }

    getDocumentType() {
        return this.#documentType
    }

    setDocumentType(documentType) {
        this.#documentType = documentType
    }

    getRangeStart() {
        return this.#rangeStart
    }

    setRangeStart(rangeStart) {
        this.#rangeStart = rangeStart
    }

    getRangeEnd() {
        return this.#rangeEnd
    }

    setRangeEnd(rangeEnd) {
        this.#rangeEnd = rangeEnd
    }
}

export default CashflowReportModel