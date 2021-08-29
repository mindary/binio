 =================
 Benchmark Summary
 =================

| Library                     | Encode <br> speed | Encode <br> % of max | Decode <br> speed | Decode <br> % of max | Size | Size <br> % of json |
| :-------------------------- | ----------------: | -------------------: | ----------------: | -------------------: | ---: | ------------------: |
| schemapack(no validation)   |       6,983 kop/s |                 100% |       18,173 kops |                 100% |  13B |                 13% |
| binio(no validation)     |       6,920 kop/s |                  99% |       15,953 kops |                  88% |  13B |                 13% |
| binio                    |       6,816 kop/s |                  98% |       16,657 kops |                  92% |  13B |                 13% |
| schemapack                  |       6,727 kop/s |                  96% |       17,801 kops |                  98% |  13B |                 13% |
| avro                        |       4,999 kop/s |                  72% |       14,704 kops |                  81% |  15B |                 15% |
| msgpackr(shared structures) |       1,902 kop/s |                  27% |        6,229 kops |                  34% |  20B |                 20% |
| msgpackr                    |       1,657 kop/s |                  24% |        1,982 kops |                  11% |  71B |                 71% |
| protobufjs                  |       1,533 kop/s |                  22% |        6,150 kops |                  34% |  29B |                 29% |
| json                        |         691 kop/s |                  10% |          844 kops |                   5% | 100B |                100% |
| binary-parser               |                 - |                    - |        1,052 kops |                   6% |  15B |                 15% |

All benchmarks were performed on node/v16.7.0; Darwin; Intel(R) Core(TM) i9-8950HK CPU @ 2.90GHz

Open link below to show the encoding and decoding speed in chart
----------------------------------------------------------------
https://quickchart.io/chart?c={type:"horizontalBar",data:{labels:["binio(no validation)","schemapack(no validation)","binio","schemapack","avro","msgpackr(shared structures)","msgpackr","protobufjs","json","binary-parser"],datasets:[{label:"Encode",data:[7465,7412,7213,7168,5064,1982,1677,1603,749,0]},{label:"Decode",data:[17352,18857,17341,17836,14088,6784,2349,5636,816,1097]}]},options:{title:{display:true,text:"Speed (op/s) - longer is better"},plugins:{tickFormat:{suffix:"k"}},scales:{xAxes:[{ticks:{callback:(value) => value.toLocaleString()}}]}}}

Open link below to show the encode byte count in chart
------------------------------------------------------
https://quickchart.io/chart?c={type:"horizontalBar",data:{labels:["binio(no validation)","schemapack(no validation)","binio","schemapack","avro","binary-parser","msgpackr(shared structures)","protobufjs","msgpackr","json"],datasets:[{label:"Binary size",data:[13,13,13,13,15,15,20,29,71,100]}]},options:{title:{display:true,text:"Size - shorter is better"},plugins:{tickFormat:{suffix:"B"}}}}
