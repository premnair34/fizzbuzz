const FizzController = require('./fizzController');
const errorHandler = require('./../common/error-handler');
const fizz = new FizzController();
class FizzAbstract{
    constructor() {  }
    static async generatefizzbuzz(req, res){
        const {count} = req.body;
        try{
            const result = await fizz.generate(count);
            res.status(200).json({"status": "success", result });
        }catch(err){
            const error = errorHandler.createError('Enter valid count', 400, 'fizzbuzz.com');
            res.status(400).json(error);
        }
    }
}
module.exports = FizzAbstract;
