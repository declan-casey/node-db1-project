const Account = require("../accounts/accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const name = req.body.name;
    const budget = req.body.budget;
    if(!name || !budget){
      res.status(400).json({
        message: "Please add a name and budget for this account."
      })
    } else if(typeof name !== "string"){
      res.status(400).json({
        message: "The name of this account must be a string"
      })
    } else if(name.trim().length < 3){
      res.status(400).json({
        message: "Name must be longer than three characters"
      })
    } else if(isNaN(budget)){
      res.status(400).json({
        message: "The budget of this account must be a number"
      })
    } else if(budget < 0 || budget > 1000000000){
      res.status(400).json({
        message: "The budget for this account is either too large or too small"
      })
    } else{
      req.body.name = name.trim();
      next();
    }
  } catch(err){
    res.status(500).json(err);
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const userAccount = await Account.getAll();
    const result = userAccount.filter((account) => {
      if(account.name === req.body.name.trim()){
        return account
      }
    });
    if(result.length > 0) {
      res.status(400).json({
        message: "This name is already taken"
      })
    } else{
      next()
    }
  } catch(err){
    res.status(500).json(err)
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id);
    if(!account){
      res.status(404).json({
        message: "This account could not be found"
      })
    } else{
      req.account = account;
      next
    }
  } catch(err){
      next(err)
  }
}
