import {discardCashflowQuery, saveCashflow} from '../query/reportQuery'

class CashflowReportModel {
    #reportID 
    #treasuryID
    #insuranceDate
    #documentType
    #rangeStart
    #publisher
    #rangeEnd
    #incomeArray
    #expenseArray
    #status 
    #signatureArray

    constructor({reportID = 'AUTO', treasuryID = null, insuranceDate = null, documentType = null, rangeStart = null, rangeEnd = null, incomeArray = {}, status = 'DETAILED', expenseArray = {}, publisher = null, signatureArray = []}) {
        this.#reportID = reportID,
        this.#treasuryID = treasuryID,
        this.#insuranceDate = insuranceDate
        this.#documentType = documentType
        this.#rangeStart = rangeStart
        this.#publisher = publisher
        this.#rangeEnd = rangeEnd
        this.#incomeArray = incomeArray
        this.#expenseArray = expenseArray
        this.#status = status
        this.#signatureArray = signatureArray

        // if (this.#incomeArray.length > 0 && !isClassObject(this.#incomeArray[0])) this.#convertToLedgerEvidenceIncome()
        // if (this.#expenseArray.length > 0 && !isClassObject(this.#expenseArray[0])) this.#convertToLedgerEvidenceExpense()
    }

    extractJSON() {
        return {
            reportID: this.#reportID,
            treasuryID:  this.#treasuryID,
            insuranceDate: this.#insuranceDate,
            documentType: this.#documentType,
            rangeStart: this.#rangeStart,
            publisher: this.#publisher,
            rangeEnd: this.#rangeEnd,
            status: this.#status,
            incomeArray: this.#incomeArray,
            expenseArray: this.#expenseArray,
            signatureArray: this.#signatureArray
            
        }
    }

    // Save the record in the database
    async saveCashflowRecord() {
        const response = await saveCashflow(this.extractJSON())
        return (response.status === 200)
        ? {
            // Request worked
            process: response.data.proceed,
            content: response.data.content,
            errorMessage: response.data.errorMessage
        } : false
    }

    async reportDiscard() {
        const response = await discardCashflowQuery(this.#reportID)
        return response.status === 200 && response.data.proceed
            ? response.data.proceed
            : false
    }



    // Getters and Setters
    getSignatureArray() {
        return this.#signatureArray
    }

    setSignatureArray(signatureArray) {
        this.#signatureArray = signatureArray
    }

    getPublisher() {
        return this.#publisher
    }

    setPublisher(publisher) {
        this.#publisher = publisher
    }

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