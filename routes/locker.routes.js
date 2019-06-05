const router = require('express').Router();
const Locker = require('../models/Locker');

//GET ALL lockers
router.get('/', (req,res,next)=>{
    Locker.find({}, (err,lockers)=>{
        if (err) return next(err);
        return res.json(lockers);
    });
});

//GET Locker By Id
router.get('/:id', (req,res,next)=>{
    Locker.findById(req.params.id, (err, locker)=>{
        if (err) return next(err);
        return res.json(locker);
    });
});

//Create A new Locker
router.post('/', (req,res,next)=>{
    if (req.body.lockerName){
        if (req.body.dimensions){
            let newLocker = new Locker(req.body);
            newLocker.save((err, createdLcoker)=>{
                if (err) return next(err);
                return res.json(createdLcoker);
            })
        }else{
            return res.json({message:'Please Provide Locker Dimensions'});
        }
    }else{
       return res.json({message:'Please Provide Locker ID'});
    }
});


//Update Locker Information
router.patch('/:id', (req,res,next)=>{
    Locker.findByIdAndUpdate(req.params.id, req.body, (err,updatedLocker)=>{
        if (err) return next(err);
        return  res.json(updatedLocker);

    });
});


//Remove a locker Completely
router.delete('/:id', (req,res,next)=>{
    Locker.findByIdAndDelete(req.params.id, (err, deleted)=>{
        if (err) return next(err);
        return res.json(deleted)
    });
});



//Reserve a Locker
router.post('/reserve/:lockerId', (req, res, next)=>{
    
    if (req.body.depositor){
        Locker.findByIdAndUpdate(req.params.lockerId, req.body, (err, requestedLocker)=>{
            if (err) return next(err);

            return res.json(requestedLocker);
        })
    }else{
        return res.status(400, {message:'please specify user information'});
    }
});


//Open Locker
router.patch('/open/:id', (req,res,next)=>{

});

//Close Locker
router.patch('/close/:id', (req,res,next)=>{
    
});

//Get All Available Lockers
router.get('/available', (req,res,next)=>{
    Locker.find({isReserved:false}, (err, freeLockers)=>{
        if (err) return next(err);
        return res.json(freeLockers);
    });
});


//Get All Reserved Lockers
router.get('/reserved', (req,res,next)=>{
    Locker.find({isReserved:true}, (err, freeLockers)=>{
        if (err) return next(err);
        return res.json(freeLockers);
    });
});

//Get User Reserved Lockers
router.get('/reserved/:userId', (req,res,next)=>{
    Locker.find({isReserved:true,depositor:req.params.userId}, (err, freeLockers)=>{
        if (err) return next(err);
        return res.json(freeLockers);
    });
});


//Get Booked For maitenance

router.get('/maintained', (req,res,next)=>{
    Locker.find({isBooked:true}, (err, freeLockers)=>{
        if (err) return next(err);
        return res.json(freeLockers);
    });
});





module.exports= router;