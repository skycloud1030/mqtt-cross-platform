
### Install
start mosquitto server && three client
```sh
docker-compose up -d --scale client=3
```


### Test

```sh
# subscribe topic
docker-compose exec client mosquitto_sub -h mosquitto -t /test

# push topic
docker-compose exec client mosquitto_pub -h mosquitto -t /test -m "Hello world"

# node
mqtt sub -t '/test' -h 'mosquitto' -v


# testing
wscat -c ws://mosquitto:9001
```
