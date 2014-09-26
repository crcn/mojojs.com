###
 converts a string into a hash
###

exports.strToIntHash = (str) ->
  
  hash = 0

  return hash unless str.length

  for char in [0..str.length-1]
    hash = ((hash<<5)-hash) + str.charCodeAt char
    hash |= 0 # convert to 32 bit int


  Math.abs hash

###
 picks a index based on the seed, and weight
###

exports.getRandomIndex = (seed, weight) ->

  # if the weight is [3, 1, 1], then dist will be
  # [0, 0, 0, 1, 2] 

  dist = []
  for v, i in weight
    for j in [0..v-1] 
      dist.push i

  dist[exports.strToIntHash(seed) % dist.length]