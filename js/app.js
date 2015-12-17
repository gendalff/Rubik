function RubiksCube(container){
  var DEBUG_MODE = false;
  var scale = 1,
    edgeClasses=["blue","red","yellow","orange","white","green"],
    moves = [
      //c: counterclockwise
      //w: clockwise
      //up
  {0:"cw",1:"cw",2:"cw",3:"cw",4:"cw",5:"cw",6:"cw",7:"cw",8:"cw", 9:"rl",10:"rl",11:"rl",12:"rl",13:"rl",14:"rl",15:"rl",16:"rl",17:"rl",18:"rl",19:"rl",20:"rl"},
  {21:"rl",22:"rl",23:"rl",24:"rl",25:"rl",26:"rl",27:"rl",28:"rl",29:"rl",30:"rl",31:"rl",32:"rl"},
  {33:"rl",34:"rl",35:"rl",36:"rl",37:"rl",38:"rl",39:"rl",40:"rl",41:"rl",42:"rl",43:"rl",44:"rl",45:"wc",46:"wc",47:"wc",48:"wc",49:"wc",50:"wc",51:"wc",52:"wc",53:"wc"},
      //left
  {9:"cw",10:"cw",11:"cw",21:"cw",22:"cw",23:"cw",33:"cw",34:"cw",35:"cw",0:"ud",3:"ud",6:"ud",12:"ud",24:"ud",36:"ud",45:"ud",48:"ud",51:"ud",20:"du",32:"du",44:"du"},
  {1:"ud",4:"ud",7:"ud",13:"ud",25:"ud",37:"ud",46:"ud",49:"ud",52:"ud",19:"du",31:"du",43:"du"},
  {2:"ud",5:"ud",8:"ud",14:"ud",26:"ud",38:"ud",47:"ud",50:"ud",53:"ud",18:"du",30:"du",42:"du",15:"wc",16:"wc",17:"wc",27:"wc",28:"wc",29:"wc",39:"wc",40:"wc",41:"wc"},
      //front
  {12:"wc",13:"wc",14:"wc",24:"wc",25:"wc",26:"wc",36:"wc",37:"wc",38:"wc",6:"rl",7:"rl",8:"rl",15:"du",27:"du",39:"du",45:"lr",46:"lr",47:"lr",11:"ud",23:"ud",35:"ud"},
  {3:"rl",4:"rl",5:"rl",16:"du",28:"du",40:"du",48:"lr",49:"lr",50:"lr",10:"ud",22:"ud",34:"ud"},
  {0:"rl",1:"rl",2:"rl",17:"du",29:"du",41:"du",51:"lr",52:"lr",53:"lr",9:"ud",21:"ud",33:"ud",18:"cw",19:"cw",20:"cw",30:"cw",31:"cw",32:"cw",42:"cw",43:"cw",44:"cw"}
            ],
    sqS=[
    //blue
        { u:44, r:17, d:12, l:33, w:2, c:6, x:3, y:0, class:0, obj:undefined},  //0
        { u:43, r:29, d:13, l:21, w:5, c:3, x:4, y:0, class:0, obj:undefined},  //1
        { u:42, r:41, d:14, l:9 , w:8, c:0, x:5, y:0, class:0, obj:undefined},  //2

        { u:32, r:16, d:24, l:34, w:1, c:7, x:3, y:1, class:0, obj:undefined},  //3
        { u:31, r:28, d:25, l:22, w:4, c:4, x:4, y:1, class:0, obj:undefined},  //4
        { u:30, r:40, d:26, l:10, w:7, c:1, x:5, y:1, class:0, obj:undefined},  //5

        { u:20, r:15, d:36, l:35, w:0, c:8, x:3, y:2, class:0, obj:undefined},  //6
        { u:19, r:27, d:37, l:23, w:3, c:5, x:4, y:2, class:0, obj:undefined},  //7
        { u:18, r:39, d:38, l:11, w:6, c:2, x:5, y:2, class:0, obj:undefined},   //8
    // red
        {u:2, r:12, d:51, l:18, w:11, c:33, x:0, y:3, class:1, obj:undefined},  //9
        {u:5, r:13, d:48, l:19, w:23, c:21, x:1, y:3, class:1, obj:undefined},  //10
        {u:8, r:14, d:45, l:20, w:35, c:9, x:2, y:3, class:1, obj:undefined},  //11
    // yellow
        {u:0, r:15, d:45, l:9,  w:14, c:36, x:3, y:3, class:2, obj:undefined},  //12
        {u:1, r:16, d:46, l:10, w:26, c:24, x:4, y:3, class:2, obj:undefined},  //13
        {u:2, r:17, d:47, l:11, w:38, c:12, x:5, y:3, class:2, obj:undefined},  //14
    // orange
        {u:6, r:18, d:47, l:12, w:17, c:39, x:6, y:3, class:3, obj:undefined},  //15
        {u:3, r:19, d:50, l:13, w:29, c:27, x:7, y:3, class:3, obj:undefined},  //16
        {u:0, r:20, d:53, l:14, w:41, c:15, x:8, y:3, class:3, obj:undefined},  //17
    // white
        {u:8, r:9, d:53, l:15,  w:20, c:42, x:9, y:3,  class:4, obj:undefined},  //18
        {u:7, r:10, d:52, l:16, w:32, c:30, x:10, y:3, class:4,  obj:undefined}, //19
        {u:6, r:11, d:51, l:17, w:44, c:18, x:11, y:3, class:4,  obj:undefined}, //20
    // red
        {u:1, r:24, d:52, l:30, w:10, c:34, x:0, y:4, class:1, obj:undefined},  //21
        {u:4, r:25, d:49, l:31, w:22, c:22, x:1, y:4, class:1, obj:undefined},  //22
        {u:7, r:26, d:46, l:32, w:34, c:10, x:2, y:4, class:1, obj:undefined},  //23
    // yellow
        {u:3, r:27, d:48, l:21, w:13, c:37, x:3, y:4, class:2, obj:undefined},  //24
        {u:4, r:28, d:49, l:22, w:25, c:25, x:4, y:4, class:2, obj:undefined},  //25
        {u:5, r:29, d:50, l:23, w:37, c:13, x:5, y:4, class:2, obj:undefined},  //26
    // orange
        {u:7, r:30, d:46, l:24, w:16, c:40, x:6, y:4, class:3, obj:undefined},  //27
        {u:4, r:31, d:49, l:25, w:28, c:28, x:7, y:4, class:3, obj:undefined},  //28
        {u:1, r:32, d:52, l:26, w:40, c:16, x:8, y:4, class:3, obj:undefined},  //29
    // white
        {u:5, r:21, d:50, l:27, w:19, c:43, x:9, y:4,  class:4,obj:undefined},  //30
        {u:4, r:22, d:49, l:28, w:31, c:31, x:10, y:4, class:4, obj:undefined}, //31
        {u:3, r:23, d:48, l:29, w:43, c:19, x:11, y:4, class:4, obj:undefined}, //32
    // red
        {u:0, r:36, d:53, l:42, w:9, c:35, x:0, y:5, class:1, obj:undefined},  //33
        {u:3, r:37, d:50, l:43, w:21, c:23, x:1, y:5, class:1, obj:undefined},  //34
        {u:6, r:38, d:47, l:44, w:33, c:11, x:2, y:5, class:1, obj:undefined},  //35
    // yellow
        {u:6, r:39, d:51, l:33, w:12, c:38, x:3, y:5, class:2, obj:undefined},  //36
        {u:7, r:40, d:52, l:34, w:24, c:26, x:4, y:5, class:2, obj:undefined},  //37
        {u:8, r:41, d:53, l:35, w:36, c:14, x:5, y:5, class:2, obj:undefined},  //38
    // orange
        {u:8, r:42, d:45, l:36, w:15, c:41, x:6, y:5, class:3, obj:undefined},  //39
        {u:5, r:43, d:48, l:37, w:27, c:29, x:7, y:5, class:3, obj:undefined},  //40
        {u:2, r:44, d:51, l:38, w:39, c:17, x:8, y:5, class:3, obj:undefined},  //41
    // white
        {u:2, r:33, d:47, l:39, w:18, c:44, x:9, y:5,  class:4,obj:undefined},  //42
        {u:1, r:34, d:46, l:40, w:30, c:32, x:10, y:5, class:4, obj:undefined}, //43
        {u:0, r:35, d:45, l:41, w:42, c:20, x:11, y:5, class:4, obj:undefined}, //44
    // green
        {u:12, r:39, d:44, l:11, w:47, c:51, x:3, y:6, class:5, obj:undefined}, //45
        {u:13, r:27, d:43, l:23, w:50, c:48, x:4, y:6, class:5, obj:undefined}, //46
        {u:14, r:15, d:42, l:35, w:53, c:45, x:5, y:6, class:5, obj:undefined}, //47

        {u:24, r:40, d:32, l:10, w:46, c:52, x:3, y:7, class:5, obj:undefined}, //48
        {u:25, r:28, d:31, l:22, w:49, c:49, x:4, y:7, class:5, obj:undefined}, //49
        {u:26, r:16, d:30, l:34, w:52, c:46, x:5, y:7, class:5, obj:undefined}, //50

        {u:36, r:41, d:20, l:9,  w:45, c:53, x:3, y:8, class:5, obj:undefined}, //51
        {u:37, r:29, d:19, l:21, w:48, c:50, x:4, y:8, class:5, obj:undefined}, //52
        {u:38, r:17, d:18, l:33, w:51, c:47, x:5, y:8, class:5, obj:undefined}  //53
      ],
      $move,
      drag = false, dragInit = {x:0, y:0};
  function init(){
    for(var i = 0; i < 54; i++){
        sqS[i].obj = $("<div id=\""+i+"\" class=\"sq "+edgeClasses[sqS[i].class]+"\">"+(DEBUG_MODE?i:"")+"</div>");
        sqS[i].obj.css({left:(sqS[i].x*scale*50)+"px", top:(sqS[i].y*scale*50)+"px"});
        $("#container").append(sqS[i].obj);
    }
    $(".sq").css({"width":(scale*45)+"px", "height":(scale*45)+"px", "border-radius": (9*scale)+"px", "border-width": scale*2+"px"});
    $("body").on({mousedown:mousedown, mouseup:mouseup, mousemove:mousemove});

  }
  init();

  function mousedown(obj) {
    var id = parseInt(obj.target.id);
    initDrag(obj);
  }

function initDrag(obj) {
  drag = true;
  dragInit.id = parseInt(obj.target.id);
  dragInit.x = obj.pageX;
  dragInit.y = obj.pageY;
  dragInit.r = obj.pageX + 150*scale;
  dragInit.l = obj.pageX - 150*scale;
  dragInit.u = obj.pageY - 150*scale;
  dragInit.d = obj.pageY + 150*scale;
  dragInit.dir = "";
}

  function mousemove(obj){
    var deltaX, deltaY;
      if(drag){
        deltaX = dragInit.x - obj.pageX;
        deltaY = dragInit.y - obj.pageY;
        if(Math.abs(deltaX)>Math.abs(deltaY)){
          if(deltaX>0){
            dragInit.dir = "l";
          }else{
            dragInit.dir = "r";
          }
          dragInit.phase = Math.abs(deltaX)/150*scale;
        }else{
          if(deltaY>0){
            dragInit.dir = "u";
          }else{
            dragInit.dir = "d";
          }
          dragInit.phase = Math.abs(deltaY)/150*scale;
        }
        if(dragInit.phase>1) dragInit.phase = 1;
        if(dragInit.phase>0.1) updatePosition(obj);
        console.log(dragInit.id,dragInit.dir, dragInit.phase);
      }
  }

function updatePosition(obj){
  var toMove, index;
  if(dragInit.toMove === undefined ){
    for(var i = 0; i < moves.length; i++){
      if(moves[i][dragInit.id]!==undefined && moves[i][dragInit.id].indexOf( dragInit.dir ) !== -1){
        if(dragInit.toMove!==undefined) countOffset(dragInit.toMove, 0);
        for(var ii in moves[i]){
          toMove = sqS[ii].obj.add(toMove);
        }
        moves.index = moves[i][dragInit.id].indexOf( dragInit.dir );
        moves.i = i;
        break;
      }
    }
    dragInit.toMove = toMove;
  }
  countOffset(dragInit.toMove, dragInit.phase);
}

  function countOffset(toMove, phase) {
    toMove.each(function(index, obj){
      var id = obj.id;
      $(obj).css({left: ((sqS[id].x + (sqS[sqS[id][ moves[moves.i][id][moves.index] ]].x-sqS[id].x)*phase)*scale*50)+"px"
                 , top: ((sqS[id].y + (sqS[sqS[id][ moves[moves.i][id][moves.index] ]].y-sqS[id].y)*phase)*scale*50)+"px"});
    });
  }

  function shiftObjects(){
    dragInit.toMove.each(function(index, obj){
      var id = obj.id;
      sqS[sqS[id][ moves[moves.i][id][moves.index] ]].obj = $(obj);
      obj.id = sqS[id][ moves[moves.i][id][moves.index] ];
      if(DEBUG_MODE) obj.innerHTML = obj.id;
    });
  }

  function mouseup(obj) {
    drag = false;
    if(dragInit.phase>0.5){
      countOffset(dragInit.toMove, 1);
      shiftObjects();
    }else{
      countOffset(dragInit.toMove, 0);
    }
    dragInit.toMove = undefined;
  }

  function cube(){
  }
  return {cube:cube};
}
function init(container) {
  cube = new RubiksCube($("#"+container));
}
