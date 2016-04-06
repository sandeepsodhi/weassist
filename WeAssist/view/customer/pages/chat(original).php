<div style="display: none" id="hbar">
              <div class="box box-success">
                <div class="box-header">
                  <i class="fa fa-comments-o"></i>
                  <h3 class="box-title">Chat</h3>
                </div>
                <div class="box-body chat" id="chat-box">
                  <!-- chat item -->
                  <div class="item">
                   <!-- WebRTC demo -->
                      <div class="demo" id="demo" style="min-height: 100px;height: 200px; overflow-y:auto">
                        <div class="demo-connect">
                          <!-- <li class="list-group-item" data-remove="true"><br>&nbsp&nbspConnecting...</li> -->
                          <?php
                          include '../../../model/dbConnect.php';
                            
                              //category select statement
                              echo "<select name='cat_id' id='cat_id' style='border:1px solid grey' class='col-xs-12 col-sm-12 btn btn-border' required>
                              <option value=''  selected disabled><center>Select Category</center></option>";
                              $rs=mysqli_query($conn,"select cat_id,cat_name from category");
                              while($row=mysqli_fetch_assoc($rs))
                              {
                                  echo "<option value=".$row['cat_id'].">".$row['cat_name']."</option>";
                              }
                              echo "</select>";
                            
                            ?>
                            <div id='subcat'></div>
                                <div id='city'></div>

                           <input type='hidden' class="demo-chat-create btn btn-primary" value='Create'></input>

                        
                          <button style='margin-top:5px' class="demo-chat-join btn btn-warning col-xs-4 col-sm-4 pull-right">Join</button>
                        </div>
                        <div class="demo-chat inactive">
                          <ul class="demo-chat-messages list-group">
                            <li class="list-group-item" data-remove="true">No chat messages available</li>
                          </ul>
                        </div>
                      </div>
                      <!-- /End WebRTC demo -->
                  </div>  
                  <!-- /.item -->
                </div>
                <!-- /.chat -->

                <div class="box-footer">
                  <div class="demo-chat-input">
                         <input name="message" style="width:80%" class="demo-chat-message-input form-control" onkeyup="javscript: if (event.keyCode==13) { sc_roll();/*$('.demo').scrollTop=$('.demo').scrollHeight;*/}"placeholder="Message" on></input>
                         <button style="background-color:#dd4b39;margin-left:78%;margin-top:-58px;width:20%px " onclick="sc_roll();" class="demo-chat-send btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
             <div id="sh" visibility="hidden"></div>
          </div>