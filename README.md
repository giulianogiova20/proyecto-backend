# Proyecto BACKEND para CoderHouse

## Tercer Entrega

La estructura es app > route > controller > dao

La app esta diseñada para funcionar con MongoDB como DB sin hacer uso de postman.

Los usuarios registrados tienen hardcodeado +54 como codigo internacional

## TESTS

## Artillery test

artillery quick --count 20 -n 50 http://localhost:8080/api/products > artillery_cluster.txt / artillery_fork.txt

<b>Las request dan timeout</b>

## Autocannon test
npm test --> captura autocannon_fork_test.jpg

<b>Las request dan timeout</b>
