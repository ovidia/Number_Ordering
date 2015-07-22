var unsortedNumbers = [234,132,12, 400];
var sortedNumbers = [12,132,234,400];
var dropTargetDiv1 = '';
var dropTargetDiv2 = '';
dropTargetDiv1 = "<div ondrop = 'drop(event)' ondragover = 'allowDrop(event)' class = 'drop-target1' id = 'drtarget1' >";
dropTargetDiv2 = "<div ondrop = 'drop(event)' ondragover = 'allowDrop(event)' class = 'drop-target2' id = 'drtarget2'>";

function createNumberedLabels()
{
    var div = '';
    var image = '';
    var label = '';
    var list = $('#drag-drop');
    
    for (var i = 0; i < unsortedNumbers.length; i++) 
    { 
        div += "<div draggable = 'true' ondragstart = 'drag(event)' ondragover = 'allowDrop(event)' id = 'drag" + i + "' class = 'drag'>";
        image = "<img src = '../img/starr.png' class = 'img1' draggable = 'false'><br>";
        label = "<label class = 'number-label'> "+ unsortedNumbers[i] + " </label></div>";
        div += image + label;                          
    } 
    
    dropTargetDiv1 += div + "</div>";
    list.append(dropTargetDiv1);
}

function createEmptyLabels()
{
    var div = '';
    var image = '';
    var label = '';
    var list = $('#drag-drop');
    
    for (var i = 0; i < unsortedNumbers.length; i++) 
    { 
        div += "<div draggable = 'false'  id = 'drop" + i + "' class = 'drop'>";
        image = "<img src = '../img/starr.png' class = 'img1' draggable = 'false'><br>";
        label = "<label class = 'number-label'> </label></div>";
        div += image + label;                    
    } 

    dropTargetDiv2 += div + "</div>";   
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
    $('#'+ data).removeClass('correct'); 
    $('#drop').removeClass('correct'); 
    $('#'+ data).removeClass('incorrect'); 
    $('#drop').removeClass('incorrect');
}

function drop(ev) 
{
    ev.preventDefault();    
    var data = ev.dataTransfer.getData("text");    
    ev.target.appendChild(document.getElementById(data));

    for(var i = 0; i < unsortedNumbers.length; i++)
    {
        if ( $.browser.webkit ) 
        {
            if((ev.target.id) == 'drop'+ i )
            {
                $('#'+ data).css({"margin-top": "-55px", "margin-left": '-3px'});
                $("#" + data + " .img1").css({"opacity":"1"});             
                $(ev.target).addClass('swing');
                getAnswer(data, i );
                showMessage();
                i = unsortedNumbers.length;
            }
            else
            {
                $('#'+data).css({"margin-top": "27px", "margin-left": "10px"}); 
            }
        }
        if ( $.browser.mozilla ) 
        {
            if((ev.target.id) == 'drop'+i)
            {                
                $('#'+data).css({"margin-top": "-59px", "margin-left": '-3px'});                
                $("#" + data + " .img1").css({"opacity":"1"}); 
                $(ev.target).addClass('swing');
                getAnswer(data, i );
                showMessage();
                i = unsortedNumbers.length;
            }
            else
            {
                $('#'+ data).css({"margin-top": "27px", "margin-left": "10px"}); 
            }
        }
    }     
}

var correctAnswers = 0;
var incorrectAnswers ="";
function getAnswer(data, target)
{
    var number = -1;
    number = $('#'+data).text();

   for(var i = 0; i < sortedNumbers.length ; i++)
        if (sortedNumbers[target] == number)
        {
            correctAnswers++;
            $('#'+data).addClass('correct');
            $('.drop#drop'+i).addClass('correct');
            i = sortedNumbers.length;
        } 
        else 
        {
            $('#'+data).addClass('incorrect');
            $('.drop#drop'+i).addClass('incorrect');
            incorrectAnswers += target;
            i = sortedNumbers.length;
        }
}

function showMessage()
{
    if(correctAnswers == sortedNumbers.length) 
    {
        $('#bubble-message').append("We sliped on the slied 10 times!");
        $('.bubble').show();
        $('#happy').show();
    }
    else 
        if($('#drtarget1').is(':empty') == true)
        {
            $('#bubble-message').append("Try again!");
            $('#sad').show();
        }
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
    var correctAnswers = 0;
    var incorrectAnswers ="";
}

$(document).ready(function() 
{ 
    createNumberedLabels();
    createEmptyLabels();
    init();
});
