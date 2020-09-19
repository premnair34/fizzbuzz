class FizzController{
    generate(count = 10){
        return new Promise((resolve,reject) => {
            let result = [];  
            const mapFizz = ["FizzBuzz","Fizz","Buzz"];
            if(count < 1)
                reject(false);
            for(let i= 1;i<=count;i++){
                if (i % 15 == 0) result.push(mapFizz[0]);
                else if (i % 3 == 0) result.push(mapFizz[1]);
                else if (i % 5 == 0) result.push(mapFizz[2]);
                else result.push(i);
            }
            resolve(result); 
        });
    }
}
module.exports = FizzController;