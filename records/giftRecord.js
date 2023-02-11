class GiftRecord {
    static listAll(){
        return [
            {
                id: 'abcdef1',
                name: 'Samochodzik',
                amount: 25
            },
            {
                id: 'adcdef2',
                name: 'Domek dla lalek',
                amount: 20,
            },
            {
                id: 'accdef3',
                name: 'Puzzle',
                amount: 50
            },
        ]
    }
}

module.exports = {
    GiftRecord
}