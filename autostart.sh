#!/bin/sh
for((;;))
do
a=$(ps -a | grep npm)
if [ "$a" ] ; then
  sleep 10
else
  killall -9 node
  npm start
fi
done
