module.exports = function( db ){
  var gameSchema = new db.Schema({
      num: Number,
      redScore: Number,
      blueScore: Number,
      lastWinner: String
  })
  return db.model('Game', gameSchema)
}
