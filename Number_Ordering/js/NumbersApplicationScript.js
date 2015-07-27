var unsortedNumbers = [234,132,12, 400];
var sortedNumbers = [12,132,234,400];
var letter = ["F", "I", "V", "E"];
var dropTargetDiv1 = '';
var dropTargetDiv2 = '';

/*wrappers for numbered and empty elements */
dropTargetDiv1 = "<li><div ondrop = 'drop(event)' ondragover = 'allowDrop(event)' class = 'drop-target1 list-group-item panel img-responsive' id = 'drtarget1' >";
dropTargetDiv2 = "<li><div class = 'drop-target2 list-group-item panel img-responsive ' id = 'drtarget2'>";


function createNumberedElements()
{
    var div = '';
    var image = '';
    var label = '';
    var list = $('#drag-drop');
    
    for (var i = 0; i < unsortedNumbers.length; i++) 
    { 
        div += "<div draggable = 'true' ondragstart = 'drag(event)'  id = 'drag" + i + "' class = 'drag panel img-responsive'>";
        image = "<img src = '../img/starr.png' class = 'img1 img-rounded img-responsive' draggable = 'false'><br>";
        label = "<label class = 'number-label'> "+ unsortedNumbers[i] + " </label></div>";
        div += image + label;                          
    } 

    dropTargetDiv1 += div + "</div></li>";
    list.append(dropTargetDiv1);
}

function createEmptyElements()
{
    var div = '';
    var image = '';
    var label = '';
    var list = $('#drag-drop');
    
    for (var i = 0; i < unsortedNumbers.length; i++) 
    { 
        div += "<div draggable = 'false'  id = 'drop" + i + "' ondrop = 'drop(event)' ondragover = 'allowDrop(event)' class = 'drop panel img-responsive'>";
        image = "<img src = '../img/starr.png' class = 'img1 img-rounded img-responsive' draggable = 'false'><br>";
        label = "<label class = 'number-label'> </label></div>";
        div += image + label;                    
    } 

    dropTargetDiv2 += div + "</div></li>";   
    list.append(dropTargetDiv2); 
}

function allowDrop(ev) 
{
    ev.preventDefault();
    $(ev.target).removeClass('swing');   
}

function drag(ev) 
{
    ev.dataTransfer.setData("text", ev.target.id);
    var data = ev.dataTransfer.getData("text");

    var i = (ev.target.id).substr((ev.target.id).length-1, (ev.target.id).length);
    $('#'+ data).removeClass('drop-drtarget1'); 
    $("#" + data + " .img1").css({"opacity":"0.2"});
}

function drop(ev) 
{
    ev.preventDefault();    
    var data = ev.dataTransfer.getData("text");
      
    if((ev.target.className) != 'img1 img-rounded img-responsive') 
    {
        ev.target.appendChild(document.getElementById(data));

        if((ev.target.id) == 'drtarget1') 
        {
            correctAnswers--;
            if(correctAnswers <= 0)
                correctAnswers = unsortedNumbers.length - incorrectAnswers.length;
        }    

        for(var i = 0; i < unsortedNumbers.length; i++)
        {
            if ( $.browser.webkit ) 
            {
                if((ev.target.id) == 'drop'+ i )
                {       
                    getAnswer(data, i );
                    $(ev.target).addClass('swing');
                    showMessage();
                    i = unsortedNumbers.length+1;
                }

                if((ev.target.id) == 'drtarget1')
                {  
                    $('#'+ data).removeClass('incorrect');
                    $('#'+data).addClass('drop-drtarget1'); 
                }
            }
            else
                if ( $.browser.mozilla ) 
                {
                    if((ev.target.id) == 'drop'+i)
                    {                        
                        getAnswer(data, i );
                        $(ev.target).addClass('swing');
                        showMessage();
                        i = unsortedNumbers.length+1;
                    }

                    if((ev.target.id) == 'drtarget1')
                    {
                        $('#'+ data).removeClass('incorrect');
                        $('#'+ data).addClass('drop-drtarget1'); 
                    }
                }        
        }  
    }   
}

var correctAnswers = 0;
var incorrectAnswers ="";

/* checks user's answer and counts the right and wrong answers*/
function getAnswer(data, target)
{
    var number = -1;
    number = $('#'+data).text();

    for(var i = 0; i < sortedNumbers.length ; i++)
        if (sortedNumbers[target] == number)
        {
            $('#'+ data).addClass('correct');
            $('#'+ data).attr("draggable", 'false');
            $("#" + data + " .img1").css({"opacity":"1"});
            $('#'+ data + ' .number-label').append("<br><label class = 'letter-label'><center>" + letter[target] + "</center></label>");
            correctAnswers++;
            i = sortedNumbers.length;
        } 
        else 
        {
            $('#'+data).addClass('incorrect');
            incorrectAnswers += target;
            i = sortedNumbers.length;

        }
}

function showMessage()
{
    if(correctAnswers == sortedNumbers.length) 
    {
        $('.bubble #bubble-message').empty();
        $('#sad').hide();
        $('.bubble').append("<center><label id = 'bubble-message'> We sliped on the slide 5 times!</label></center>");
        $('.bubble').show();
        $('#happy').show();
    }
    else 
        if($('#drtarget1').is(':empty') == true)
        {
            $('.bubble #bubble-message').empty();
            $('#sad').show();
            $('#happy').hide();
            $('.bubble').append("<center><label id = 'bubble-message'>Try again!</label></center>");
            $('.bubble').show();            
        }

    $('.form-group').click(function () 
    {
        $('.bubble').hide();
        $('#happy').hide();
        $('#sad').hide();
    });
}

function init()
{
    $('.bubble').hide();
    $('#happy').hide();
    $('#sad').hide();

    $('.drag').mouseenter(function () 
    {
        $(this).addClass('active');
    });

    $('.drag').mouseleave(function () 
    {
        $(this).removeClass('active');
    });

    $('.drop').mouseenter(function () 
    {
        $(this).addClass('active');
    });

    $('.drop').mouseleave(function () 
    {
        $(this).removeClass('active');
    });
}

$(document).ready(function() 
{ 
    createNumberedElements();
    createEmptyElements();
    init();
});

