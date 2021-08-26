 =================
 Benchmark Summary
 =================

| Library                     | Encode <br> speed | Encode <br> % of max | Decode <br> speed | Decode <br> % of max | Size | Size <br> % of json |
| :-------------------------- | ----------------: | -------------------: | ----------------: | -------------------: | ---: | ------------------: |
| binpackr(no validation)     |       7,465 kop/s |                 100% |       17,352 kops |                  92% |  13B |                 13% |
| schemapack(no validation)   |       7,412 kop/s |                  99% |       18,857 kops |                 100% |  13B |                 13% |
| binpackr                    |       7,213 kop/s |                  97% |       17,341 kops |                  92% |  13B |                 13% |
| schemapack                  |       7,168 kop/s |                  96% |       17,836 kops |                  95% |  13B |                 13% |
| avro                        |       5,064 kop/s |                  68% |       14,088 kops |                  75% |  15B |                 15% |
| msgpackr(shared structures) |       1,982 kop/s |                  27% |        6,784 kops |                  36% |  20B |                 20% |
| msgpackr                    |       1,677 kop/s |                  22% |        2,349 kops |                  12% |  71B |                 71% |
| protobufjs                  |       1,603 kop/s |                  21% |        5,636 kops |                  30% |  29B |                 29% |
| json                        |         749 kop/s |                  10% |          816 kops |                   4% | 100B |                100% |
| binary-parser               |                 - |                    - |        1,097 kops |                   6% |  15B |                 15% |

All benchmarks were performed on node/v16.7.0; Darwin; Intel(R) Core(TM) i9-8950HK CPU @ 2.90GHz

Open link below to show the encoding and decoding speed in chart
----------------------------------------------------------------
https://quickchart.io/chart?c={type:"horizontalBar",data:{labels:["binpackr(no validation)","schemapack(no validation)","binpackr","schemapack","avro","msgpackr(shared structures)","msgpackr","protobufjs","json","binary-parser"],datasets:[{label:"Encode",data:[7465,7412,7213,7168,5064,1982,1677,1603,749,0]},{label:"Decode",data:[17352,18857,17341,17836,14088,6784,2349,5636,816,1097]}]},options:{title:{display:true,text:"Speed (op/s) - longer is better"},plugins:{tickFormat:{suffix:"k"}},scales:{xAxes:[{ticks:{callback:(value) => value.toLocaleString()}}]}}}

Open link below to show the encode byte count in chart
------------------------------------------------------
https://quickchart.io/chart?c={type:"horizontalBar",data:{labels:["binpackr(no validation)","schemapack(no validation)","binpackr","schemapack","avro","binary-parser","msgpackr(shared structures)","protobufjs","msgpackr","json"],datasets:[{label:"Binary size",data:[13,13,13,13,15,15,20,29,71,100]}]},options:{title:{display:true,text:"Size - shorter is better"},plugins:{tickFormat:{suffix:"B"}}}}
