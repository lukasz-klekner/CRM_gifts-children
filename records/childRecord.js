class ChildRecord {
    static listAll(){
        return [
            {
                id: 'abcdef',
                name: 'Amadeusz',
                gift: 'Samochodzik'
            },
            {
                id: 'adcdef',
                name: 'Beata',
                gift: 'Domek dla lalek'
            },
            {
                id: 'accdef',
                name: 'Piotrek',
                gift: 'Puzzle'
            },
        ]
    }
}

module.exports = {
    ChildRecord
}