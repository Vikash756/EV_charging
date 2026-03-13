const authService = require("../services/authService")

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body)
    res.status(201).json({ success: true, data: user }) // ✅ consistent response
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body)
    res.status(200).json({ success: true, data: result }) // ✅ status 200 explicit
  } catch (err) {
    next(err)
  }
}