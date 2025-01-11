import {React} from 'react'

function GameHistory() {
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Bet List</h6>
                        <div className="form-group d-flex">
                            <div className="mr-2">
                                <label><strong>Select Game :</strong></label>
                                <div className="d-flex">
                                    <select id="game_type" className="js-example-basic-single w-100" >
                                        <option value="">--Select Game--</option>
                                        <option value="lucky_cards_12_one">Lucky 12 one</option>
                                        <option value="lucky_cards_12_two">Lucky 12 two</option>
                                        <option value="lucky_cards_12_three">Lucky 12 coupon</option>
                                        <option value="lucky_cards_16">Lucky 16</option>
                                        <option value="triple_chance">Triple Chance</option>
                                        <option value="roulette">Roulette</option>

                                        <option value="single_chance">Dus ka Dum</option>
                                        <option value="single_chance_two">lucky 10 coupon</option>
                                        <option value="single_chance_three">Grand Chance</option>

                                        <option value="single_chance_3d_one">Fun Target one</option>
                                        <option value="single_chance_3d_two">Fun Target two</option>
                                        <option value="single_chance_3d_three">Fun Timer</option>
                                        <option value="andar_bahar">Andar Bahar</option>
                                        <option value="dragon_tiger">Dragon Tiger</option>
                                        <option value="lucky_sorat">Titli Sorat</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mr-2">
                                <label><strong>Select User :</strong></label>
                                <div className="d-flex">
                                    <select id="user_id" className="js-example-basic-single w-100" >
                                        <option value="">--Select User--</option>
                                        <option value="66586269820e71961b0397e0">
                                            pune0001</option>
                                        <option value="66586282716bf9bfb7002331">
                                            pune0002</option>
                                        <option value="665862a06c0d295ad6043580">
                                            pune0003</option>
                                        <option value="665862dcb0d22f0187078bc9">
                                            pune0004</option>
                                        <option value="665863c3820e71961b0397e2">
                                            khandala0001</option>
                                        <option value="665863d3716bf9bfb7002333">
                                            khandala0002</option>
                                        <option value="665863df908a1d737e015d21">
                                            khandala0003</option>
                                        <option value="665863f00913cb3ee6056eb6">
                                            khandala0004</option>
                                        <option value="665984accea9425719071b82">
                                            sachinTest</option>
                                        <option value="665984c041903efeec0b1822">
                                            anil</option>
                                        <option value="666ac040ed7811d7970423f3">
                                            sachinTest2</option>
                                        <option value="6672c9725d4c4672250e1952">
                                            demo</option>
                                        <option value="66753c9a76c64618360ee332">
                                            rajendra</option>
                                        <option value="667550a01b3e6180f8062d92">
                                            sachin</option>
                                        <option value="668d196c792998dcda0325a2">
                                            atul</option>
                                        <option value="669752986ceb574844031232">
                                            100100</option>
                                        <option value="66976d02112b40f52a0f2982">
                                            demo17</option>
                                        <option value="66976d197af14f1f0a0247a2">
                                            demo18</option>
                                        <option value="66976d28c9288bcdbb024413">
                                            demo20</option>
                                        <option value="669df556e8b19efdb70f5a02">
                                            Datta88</option>
                                        <option value="669e2f9ce8b19efdb70f5a03">
                                            Datta99</option>
                                        <option value="669fcdc63070c84354047492">
                                            Fun0000001</option>
                                        <option value="66a079086b375b0ac805f5d2">
                                            Fun001</option>
                                        <option value="66a492ce77269abf180fba12">
                                            Satish</option>
                                        <option value="66b0a75005344240030cb514">
                                            p01</option>
                                        <option value="66b0a75e61750836bd0a33e2">
                                            p02</option>
                                        <option value="66b0a76d5232f6ef98013382">
                                            p03</option>
                                        <option value="66b22e7b744ca7b45c05cbc2">
                                            000111</option>
                                        <option value="66b5e8b82332c891b30a5233">
                                            Sumit01</option>
                                        <option value="66b793dfe7575acc660a0928">
                                            RR0004</option>
                                        <option value="66b9c37c24ff75de810f4202">
                                            0022</option>
                                        <option value="66b9cc770e1ff05fac09854b">
                                            0034</option>
                                        <option value="66b9dfcfb441c30605033cc2">
                                            aakash01</option>
                                        <option value="66b9e0e63e37d3c7920bf0b4">
                                            aakash002</option>
                                        <option value="66bb09bd9f0cfa99600ea9c2">
                                            aakash03</option>
                                        <option value="66bb0babcd0fde51340a5642">
                                            aak004</option>
                                        <option value="66bb532bcd0fde51340a5646">
                                            aak005</option>
                                        <option value="66bc3f16c41f5080b3097aa2">
                                            Puna0004</option>
                                        <option value="66bc8773bba7105daf0c3f16">
                                            kol01</option>
                                        <option value="66bf2557f730dc3edf094aa5">
                                            Tinkle</option>
                                        <option value="66c085bf772e11603f0159c2">
                                            aa10</option>
                                        <option value="66c2d0a72d1bb9e1480449c2">
                                            Na5566</option>
                                        <option value="66c31b7f466c1ae5820d6e79">
                                            salimar1</option>
                                        <option value="66c783052d48e74f370d1692">
                                            Ak09</option>
                                        <option value="66c887dac58f58d3980a8e92">
                                            abu</option>
                                        <option value="66c88a8db6108d90ae0734d6">
                                            Rohit</option>
                                        <option value="66c9f2e9cde4cbbde107e6a5">
                                            aa11</option>
                                        <option value="66cc6922a2d1c1ba2e065502">
                                            raj</option>
                                        <option value="66cc9b3b44493d7dd4034af2">
                                            Ganesh01</option>
                                        <option value="66cd6a8e8ab913ed94022332">
                                            Lakshmi</option>
                                        <option value="66cee2c251ee710a400eb272">
                                            1122</option>
                                        <option value="66cee751131a5e0ff0075252">
                                            1144</option>
                                        <option value="66ceed69dd493c15810f2dfb">
                                            aa13</option>
                                        <option value="66ceed99de6ddb0f98018775">
                                            aa14</option>
                                        <option value="66cf2f9a51ee710a400eb279">
                                            aa15</option>
                                        <option value="66cf2fb951ee710a400eb27a">
                                            aa16</option>
                                        <option value="66d03b855def5889a20bafd5">
                                            aa17</option>
                                        <option value="66d0407cc82a88b530051515">
                                            Anop</option>
                                        <option value="66d0565bc82a88b530051517">
                                            nikhil</option>
                                        <option value="66d0576f85f68270e9024e15">
                                            sachinmob</option>
                                        <option value="66d063604fc08d36a60fd252">
                                            Aass</option>
                                        <option value="66d07a58a9bb236962069452">
                                            anilmob</option>
                                        <option value="66d07ef507cf2d738e03ec25">
                                            Mayur1999</option>
                                        <option value="66d08e8da9bb23696206945a">
                                            test</option>
                                        <option value="66d0906f2580576dfc01f032">
                                            Fresh4194</option>
                                        <option value="66d0bb1a6569e6f1fc04a4e2">
                                            VR@123</option>
                                        <option value="66d1661fc86923701900f752">
                                            Boss</option>
                                        <option value="66d184c34fdfdb0d2e0fae42">
                                            sk0001</option>
                                        <option value="66d196304fdfdb0d2e0fae43">
                                            Audi4455</option>
                                        <option value="66d196503e055b0f7d066e66">
                                            frozen6600</option>
                                        <option value="66d19670aad0fa49660b8be7">
                                            covers3399</option>
                                        <option value="66d19696a9b197a1d400b4f8">
                                            bullet1166</option>
                                        <option value="66d1b1024fdfdb0d2e0fae47">
                                            Yasir</option>
                                        <option value="66d1b62239d6ce4893014f72">
                                            Yas</option>
                                        <option value="66d1b65fc86923701900f75e">
                                            Srk77</option>
                                        <option value="66d2e6df2e59cebbe7025525">
                                            satishg</option>
                                        <option value="66d2e9a646572ef3e10f73e2">
                                            Sheru</option>
                                        <option value="66d2ef25ea869c89af0d1bf5">
                                            00011</option>
                                        <option value="66d34d98980c5e825205dfcb">
                                            kiranpatil</option>
                                        <option value="66d35f0b18ce70ceb20a8092">
                                            IM0001</option>
                                        <option value="66d467e0db7c716676028fc6">
                                            AR0001</option>
                                        <option value="66d479186a1e461b1f06c1a5">
                                            UP0001</option>
                                        <option value="66d5c955d4046b8e7f008412">
                                            rohan1</option>
                                        <option value="66d82402fbd8ab9a780a72b2">
                                            vk001</option>
                                        <option value="66d8241afb90c1f67d011c32">
                                            vk002</option>
                                        <option value="66d8242bf88dada3e403b882">
                                            vk003</option>
                                        <option value="66d82454123099b76e020832">
                                            vk004</option>
                                        <option value="66d82487df109e0af4057bf2">
                                            vk005</option>
                                        <option value="66d82543bc35c9402b00d6b5">
                                            test01</option>
                                        <option value="66d88064f88dada3e403b889">
                                            karan</option>
                                        <option value="66d8893196810ac9bc067762">
                                            ram</option>
                                        <option value="66d9fa7de855a497010a9c15">
                                            Sumit1</option>
                                        <option value="66da98a23aa73db6270fb592">
                                            Sultan01</option>
                                        <option value="66dbe613d8ed2757350706d2">
                                            rohit</option>
                                        <option value="66dd651c2e83c7cbae092aa2">
                                            Demo1</option>
                                        <option value="66dd666e47e17b5ab40ada46">
                                            Ram1</option>
                                        <option value="66def5b72a15bff1410603a2">
                                            Amrut11</option>
                                        <option value="66def665f93fcf72b4001db5">
                                            Meetraj</option>
                                        <option value="66def82e91eabae37f081283">
                                            Santoshp</option>
                                        <option value="66df03bc51a9432a9d0c58c8">
                                            abhusaval</option>
                                        <option value="66e002e28684f8b169052933">
                                            Dr1233</option>
                                        <option value="66e0048c8daba1c18f02eab2">
                                            DD123</option>
                                        <option value="66e00785fdc96f649c07b483">
                                            MAYA</option>
                                        <option value="66e007943be96c48ee05ec33">
                                            Dr1122</option>
                                        <option value="66e0178bfdc96f649c07b484">
                                            PK@11</option>
                                        <option value="66e03f1cfdc96f649c07b485">
                                            Km2233</option>
                                        <option value="66e04e4efdc96f649c07b486">
                                            Siuri</option>
                                        <option value="66e144cdf9c144957d0d3da2">
                                            Jaybhavani</option>
                                        <option value="66e147500af83badb90a0a22">
                                            Nashik</option>
                                        <option value="66e1bb5c0f432b1e5f00ab95">
                                            NIK11</option>
                                        <option value="66e1bc5ff455f68d950cabd8">
                                            RD888</option>
                                        <option value="66e275e856cb6c51ce010d92">
                                            gk001</option>
                                        <option value="66e2a323db892d88c0056162">
                                            Ld3434</option>
                                        <option value="66e2f04717f89f497f0ea563">
                                            swar111</option>
                                        <option value="66e2f48ddb892d88c0056166">
                                            GK</option>
                                        <option value="66e304a1faa16f71f800398b">
                                            Da</option>
                                        <option value="66e30b1c187db00c6b00c659">
                                            BUNTS</option>
                                        <option value="66e3ddc3d5b86d67a7024662">
                                            Ssaa</option>
                                        <option value="66e56ba7ec77183c660484e5">
                                            Kaka</option>
                                        <option value="66e58c09a20a2067410a6752">
                                            yash</option>
                                        <option value="66e59a942c14dc38e20f6913">
                                            444555</option>
                                        <option value="66e68a59e6714887de019153">
                                            vk006</option>
                                        <option value="66e6e2313efa6d75d50d2e42">
                                            AR001</option>
                                        <option value="66e6e2915ed48a6f2c0209b6">
                                            AR002</option>
                                        <option value="66e71f8c3efa6d75d50d2e47">
                                            SOP</option>
                                        <option value="66e7d05224711458260f1072">
                                            Sd12345</option>
                                        <option value="66e7d22e24711458260f1073">
                                            Su12345</option>
                                        <option value="66e812e8580d82e3520f3d92">
                                            hhhh</option>
                                        <option value="66e9866693412a97b901a032">
                                            VaishanaviS</option>
                                        <option value="66ebd4a089a7c5701c0845b5">
                                            mob01</option>
                                        <option value="66ebda44f1a1b51c4607a073">
                                            as001</option>
                                        <option value="66ebeb81f1a1b51c4607a076">
                                            Lal</option>
                                        <option value="66ed2be98ec53ce6cb0b55f2">
                                            sa100</option>
                                        <option value="66ed5db41bfee486000cc475">
                                            aaa1</option>
                                        <option value="66ed5dc018d734ec7202ef82">
                                            aaa2</option>
                                        <option value="66ed5dcf8ac973035e045685">
                                            aaa3</option>
                                        <option value="66ed5de4a76aafa2140fb4f3">
                                            aaa4</option>
                                        <option value="66ed5dfd7fc4164f8f080892">
                                            aaa5</option>
                                        <option value="66ed5e5b7fc4164f8f080893">
                                            sa200</option>
                                        <option value="66ed5e68b80620e2060f3ac2">
                                            sa300</option>
                                        <option value="66ed5e736fd86e5db0053d9b">
                                            sa400</option>
                                        <option value="66ed5e821bfee486000cc476">
                                            sa500</option>
                                        <option value="66ed5e9119ed1789ec0344e7">
                                            sa600</option>
                                        <option value="66ed84937fc4164f8f080897">
                                            Rahul12</option>
                                        <option value="66ee97403d7d6ca5c40a84f5">
                                            AD123</option>
                                        <option value="66eedd321dd0a049f2059f72">
                                            santosh</option>
                                        <option value="66ef1f922ac43cb5b400de05">
                                            Aslam</option>
                                        <option value="66f15d8f3e994edb930950a2">
                                            Lakshmi@2</option>
                                        <option value="66f25086e08c68d1530461f2">
                                            Lakshmi@3</option>
                                        <option value="66f2519c4f1b0ebcbe0d7b52">
                                            Vaishnavi2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mr-2">
                                <label><strong>Select Date Range :</strong></label>
                                <div className="d-flex">
                                    <select name="searchlimit" id="searchlimit" className="js-example-basic-single w-100" >
                                        <option value="" selected="selected">Select Date Range</option>
                                        <option value="1">Today</option>
                                        <option value="2">Yesterday</option>
                                        <option value="3">This Week</option>
                                        <option value="4">Last Week</option>
                                        <option value="5">This Month</option>
                                        <option value="6">Last Month</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mr-2">
                                <label><strong>Select Date :</strong></label>
                                <div className="d-flex">
                                    <div className="input-group ">
                                        <input type="date" className="form-control" name="to" id="to" />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <div id="example_wrapper" className="dataTables_wrapper no-footer">
                                <div className="dataTables_length" id="example_length">
                                    <label>Show
                                    <select name="example_length" aria-controls="example" className="">
                                        <option value="10">10</option><option value="25">25</option>
                                        <option value="50">50</option><option value="-1">All</option>
                                    </select> entries</label>
                                    
                                    </div>
                                <div id="example_filter" className="dataTables_filter">
                                    <label>Search:<input type="search" className="" placeholder="" aria-controls="example" /></label></div><table className="table table-bordered data-table dataTable no-footer" id="example" role="grid" aria-describedby="example_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="CreateDate: activate to sort column ascending" >CreateDate</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Game_type: activate to sort column ascending" >Game_type</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Game_id: activate to sort column ascending" >Game_id</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Ticket_id: activate to sort column ascending" >Ticket_id</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Start Point: activate to sort column ascending" >Start Point</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Won Point: activate to sort column ascending" >Won Point</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Game Result: activate to sort column ascending">Game Result</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Status: activate to sort column ascending" >Status</th>
                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="View: activate to sort column ascending" >View</th></tr>
                                    </thead>
                                    <tbody>



                                        <tr role="row" className="odd">
                                            <td className="sorting_1">1</td>
                                            <td className="sorting_1">2024-09-26 03:35:45 PM</td>
                                            <td>vk006</td>
                                            <td>Fun Timer</td>
                                            <td>8YVJPDPHS1PU</td>
                                            <td>2LGV75J0V1</td>
                                            <td>1,132.00</td>
                                            <td>40.00</td>
                                            <td>0.00</td>
                                            <td>1,092.00</td>
                                            <td>9</td>
                                            <td><span className="badge badge-danger">Loss</span></td>
                                            <td>
                                                <button type="button" className="btn btn-primary mx-1" data-toggle="modal" data-target="#message66f531f964052ceffa37c777">
                                                    view
                                                </button>
                                                <div id="message66f531f964052ceffa37c777" className="modal fade" role="dialog">
                                                    <div className="modal-dialog modal-lg">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">
                                                                    single_chance_3d_three
                                                                </h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <table className="table table-bordered">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Number</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>8</td>
                                                                            <td>40</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr><tr role="row" className="even">
                                            <td className="sorting_1">2</td>
                                            <td className="sorting_1">2024-09-26 03:35:45 PM</td>
                                            <td>vk006</td>
                                            <td>Fun Timer</td>
                                            <td>8YVJPDPHS1PU</td>
                                            <td>2LGV75J0V1</td>
                                            <td>1,132.00</td>
                                            <td>40.00</td>
                                            <td>0.00</td>
                                            <td>1,092.00</td>
                                            <td>9</td>
                                            <td><span className="badge badge-danger">Loss</span></td>
                                            <td>
                                                <button type="button" className="btn btn-primary mx-1" data-toggle="modal" data-target="#message66f531f964052ceffa37c777">
                                                    view
                                                </button>
                                                <div id="message66f531f964052ceffa37c777" className="modal fade" role="dialog">
                                                    <div className="modal-dialog modal-lg">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">
                                                                    single_chance_3d_three
                                                                </h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <table className="table table-bordered">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Number</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>8</td>
                                                                            <td>40</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr><tr role="row" className="odd">
                                            <td className="sorting_1">3</td>
                                            <td className="sorting_1">2024-09-26 03:35:45 PM</td>
                                            <td>vk006</td>
                                            <td>Fun Timer</td>
                                            <td>8YVJPDPHS1PU</td>
                                            <td>2LGV75J0V1</td>
                                            <td>1,132.00</td>
                                            <td>40.00</td>
                                            <td>0.00</td>
                                            <td>1,092.00</td>
                                            <td>9</td>
                                            <td><span className="badge badge-danger">Loss</span></td>
                                            <td>
                                                <button type="button" className="btn btn-primary mx-1" data-toggle="modal" data-target="#message66f531f964052ceffa37c777">
                                                    view
                                                </button>
                                                <div id="message66f531f964052ceffa37c777" className="modal fade" role="dialog">
                                                    <div className="modal-dialog modal-lg">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">
                                                                    single_chance_3d_three
                                                                </h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <table className="table table-bordered">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Number</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>8</td>
                                                                            <td>40</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr></tbody>
                                </table>
                                <div className="dataTables_info" id="example_info" role="status" aria-live="polite">Showing 1 to 3 of 3 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example_paginate"><a className="paginate_button previous disabled" aria-controls="example" data-dt-idx="0" tabindex="-1" id="example_previous">Previous</a><span><a className="paginate_button current" aria-controls="example" data-dt-idx="1" tabindex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example" data-dt-idx="2" tabindex="-1" id="example_next">Next</a></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameHistory