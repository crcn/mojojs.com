cluster = require "cluster"
numCPUs = require("os").cpus().length

if (process.env.NODE_ENV is "debug") or process.env.ONE_CORE isnt undefined
  numCPUs = 1

numCPUs = 1

if cluster.isMaster
  for i in [1..numCPUs]
    cluster.fork()
  cluster.on "exit", (worker, code, signal) ->
    cluster.fork()
else
  require "./entry"