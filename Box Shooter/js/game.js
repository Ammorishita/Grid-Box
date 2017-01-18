$(document).ready(function() {
    for (var i=0; i<70; i++) {
        var $div = $('<div>', {
            'class' : 'gridBox'
        });
        $('.grid').append($div);
    }
    pause = true;
});
var weapons2 = [
    {   
        'title' : 'Energy Weapon',
        'src' : 'images/Energy Ball.png'
    },
    {   
        'title' : 'Energy Weapon',
        'src' : 'images/Energy Ball2.png'
    },
    {   
        'title' : 'Energy Weapon',
        'src' : 'images/Energy Ball3.png'
    },
    {   
        'title' : 'Energy Weapon',
        'src' : 'images/Energy Ball4.png'
    },

];
var levelUp = [
    {
        'speed' : 400,
        'level' : 1
    }
];

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        $('.box').css({'top' : '-=100px'});
        console.log($('.box').css('top'));
        //up arrow
    }
    else if (e.keyCode == '40') {
        $('.box').css({'top' : '+=100px'});
        console.log($('.box').css('top'));
        //down arrow
    }
    else if (e.keyCode == '37') {
        $('.box').css({'left' : '-=100px'});
        //left arrow
    }
    else if (e.keyCode == '39') {
        $('.box').css({'left' : '+=100px'});
        console.log($('.box').css('left'));
        //right arrow
    }
    game.collision();
    game.offScreen();
};

var boxX, enemyY, enemyX, boxY, newEnemyX, newEnemyY, pause, weaponY, weaponX;
var game = {
    init: function() {
        this.offScreen();
        this.collision();
        this.enemy();
        this.menu();
        this.player();
        this.weapon();
        //this.difficulty();
    },
    menu: function() {
        $('.gameplay').click(function() {
            var clicks = $(this).data('clicks');
            console.log(clicks);
            if (clicks) {
            // odd clicks
                pause = false;
                $('.instructions').fadeToggle();
            } else {
            // even clicks
                pause = true;
                $('.instructions').fadeToggle();
            }
            $(this).data("clicks", !clicks);
        });
    },
    weapon: function() {
        var count = 0;
        setInterval(function() {
            $('.weapon2').attr('src', weapons2[count].src);
            count++;
            if(count > 3) {
                count = 0;
            }
        },80);
    },
    player: function(e) {
        document.addEventListener('keydown', attacking, false);
        function attacking(e) {
            if (e.keyCode == '32') {
                document.removeEventListener('keydown', attacking, false);
                var box = document.querySelector('.box');
                var posY = box.style.top;
                var posX = box.style.left;
                var projectile = $('<div>', {
                    'class' : 'gridBoxMini'
                });
                var sprite = $('<div>', {
                    'class' : 'weapon'
                });
                var stylesTop = window.getComputedStyle(box, null).getPropertyValue('top');
                projectile.prepend('<img class="weapon2">');
                sprite[0].style.top = stylesTop;
                sprite[0].style.left = posX;
                projectile[0].style.top = stylesTop;
                projectile[0].style.left = posX;
                $('.grid').append(projectile);
                $('.grid').append(sprite);
                var interval = setInterval(function() {
                    $('.gridBoxMini').css({'left' : '+=100px'});
                    $('.weapon').css({'left': '+=100px'});
                    var projectileX = $('.gridBoxMini').css('left');
                    var projectileXInt = parseInt(projectileX);
                    game.collision();
                    if(projectileXInt > 900) {
                        clearInterval(interval);
                        $('.weapon').remove();
                        $('.gridBoxMini').remove();
                        document.onkeydown = checkKey;
                        document.addEventListener('keydown', attacking, false);
                    }
                },100);
                document.onkeydown = disable;
                function disable(e) {
                    e = e || window.event;
                }
            }
        }
    },
    difficulty: function() {
    },
    enemy: function() {
        var enemy = $('.enemy');
        enemy.css({'background-color' : 'red'});
            enemyX = $('.enemy').css('left');
            enemyY = $('.enemy').css('top');
        var timer = setInterval(function() {
            move();
            attack();
        },levelUp[0].speed);

        function move() {
            if (pause === true) {return};
            var choice = Math.floor(Math.random() * 4);
            if (choice === 0) {enemy.css({'left' : '-=100px'})}
            if (choice == 1) {enemy.css({'left' : '+=100px'})}
            if (choice == 2) {enemy.css({'top' : '-=100px'})}
            if (choice == 3) {enemy.css({'top' : '+=100px'})}
            newEnemyX = parseInt(enemyX);
            newEnemyY = parseInt(enemyY);
            if (choice == 1 && newEnemyX > 800) {enemy.css({'left' : '-=100px'})}
            if (choice == 0 && newEnemyX < 100) {enemy.css({'left' : '+=100px'})}
            if (choice == 3 && newEnemyY > 500) {enemy.css({'top' : '-=100px'})}
            if (choice == 2 && newEnemyY < 100) {enemy.css({'top' : '+=100px'})}
            game.collision();
        };
        function attack() {
            if (pause == true) {return};
            var attack = Math.random();
            var enemyPosX = parseInt(enemyX)
            var enemyPosY = parseInt(enemyY)
            function normalAttack() {
                enemy.css({'background-color' : 'white'}),
                clearInterval(timer);
                var slide = setInterval(function() {
                    if (attack2 == 1) {enemy.css({'left' : '+=100px'})};
                    if (attack2 == 2) {enemy.css({'left' : '-=100px'})};
                    game.collision();
                    var enemyPosX = parseInt(enemyX);
                    if(enemyPosX == 900 || enemyPosX == 0) {
                        clearInterval(slide);
                        game.enemy();
                    }   
                },150);
            };
            if (attack > .90) {
                var attack2 = Math.floor(Math.random()*10);
                if(attack2 == 1 && enemyPosX < 900) {
                    normalAttack();
                }
                if (attack2 == 2 && enemyPosX > 0) {
                    normalAttack();
                }
            }
        };
    },
    collision: function() {
        weaponY = $('.gridBoxMini').css('top');
        weaponX = $('.gridBoxMini').css('left');
        enemyY = $('.enemy').css('top');
        boxY = $('.box').css('top');
        enemyX = $('.enemy').css('left');
        boxX = $('.box').css('left');
        if (boxY == enemyY && boxX == enemyX) {
            console.log('COLLISION');
            var lose = $('.playerHealth').find('.miniBox').length
            if(lose == 1) {
                setTimeout(function() {
                    alert('you lose')
                    for ( var i=0; i<3; i++) {
                    var lives = $('<div>', {
                        'class' : 'miniBox'
                    });
                    $('.playerHealth').append(lives);
                    }
                })
            }
            console.log(lose)
            var lives = document.querySelector('.miniBox');
            lives.remove();
        }
        if (weaponX == enemyX && weaponY == enemyY) {
            console.log('DAMAGE DONE.');
            $('.redBox').css({
                'width' : '-=50px'
            })
            var enemyHealth = $('.redBox').css('width');
            var enemyHealthInt = parseInt(enemyHealth);
            if(enemyHealthInt == 0) {
                var speed = levelUp[0].speed;
                var speed2 = speed -= 50;
                levelUp[0].speed = speed2;
                setTimeout(function() {
                    alert('You have won')
                    $('.redBox').css({
                        'width' : '150px'
                    })
                },50)
            }        
        }
    },
    offScreen: function() {

        var newBoxX = parseInt(boxX);
        var newBoxY = parseInt(boxY);

        if(newBoxX > 900) {
            console.log('TOO FAR TO THE RIGHT')
            $('.box').css({'left' : '-=100px'});
        }
        if(newBoxX < 0) {
            console.log('TOO FAR TO THE LEFT')
            $('.box').css({'left' : '+=100px'});
        }
        if(newBoxY < 0) {
            console.log('TOO FAR TO THE TOP')
            $('.box').css({'top' : '+=100px'});
        }
        if(newBoxY > 600) {
            console.log('TOO FAR TO THE BOTTOM')
            $('.box').css({'top' : '-=100px'});
        }
    }
}
game.init();