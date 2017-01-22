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
var orb = [
    {
        'title' : 'Orb weapon',
        'src' : 'images/Lightning.png'
    },
    {
        'title' : 'Orb weapon',
        'src' : 'images/Lightning2.png'
    },
    {
        'title' : 'Orb weapon',
        'src' : 'images/Lightning3.png'
    },
]
var effects = [
    {
        'title' : 'Explosion',
        'src' : 'images/Explosion.png'
    },
    {
        'title' : 'Explosion',
        'src' : 'images/Explosion2.png'
    },
    {
        'title' : 'Explosion',
        'src' : 'images/Explosion3.png'
    },
    {
        'title' : 'Explosion',
        'src' : 'images/Explosion4.png'
    },
    {
        'title' : 'Explosion',
        'src' : 'images/Explosion5.png'
    },
    {
        'title' : 'Explosion',
        'src' : 'images/Explosion6.png'
    },
];
var levelUp = [
    {
        'speed' : 400,
        'level' : 1,
        'pause' : true,
        'gameover' : false
    }
];

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        $('.box').css({'top' : '-=100px'});
        //up arrow
    }
    else if (e.keyCode == '40') {
        $('.box').css({'top' : '+=100px'});
        //down arrow
    }
    else if (e.keyCode == '37') {
        $('.box').css({'left' : '-=100px'});
        //left arrow
    }
    else if (e.keyCode == '39') {
        $('.box').css({'left' : '+=100px'});
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
    },
    pause: function() {
        levelUp[0].pause = false;
    },
    menu: function() {
        $('.gameplay').click(function() {
            var clicks = $(this).data('clicks');
            console.log(clicks);
            if (clicks) {
            // odd clicks
                pause = false;
                levelUp[0].pause = false;
                game.pause();
                $('.instructions').fadeToggle();
            } else {
            // even clicks
                pause = true;
                levelUp[0].pause = true;
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
    effects: function() {
        var count = 0;
        var animation = setInterval(function() {
            $('.effects').css({
                'left' : enemyX,
                'top' :  enemyY
            })
            $('.effects').attr('src', effects[count].src);
            count++;
            if(count > 5) {
                $('.effects').attr('src', 'images/Explosion Default.png');
                clearInterval(animation)
            }
        },40);
    },
    player: function(e) {
        document.addEventListener('keydown', attacking, false);
        function attacking(e) {
            if (e.keyCode == '32') {
                document.removeEventListener('keydown', attacking, false);
                var projectile = $('<div>', {
                    'class' : 'gridBoxMini'
                });
                var sprite = $('<div>', {
                    'class' : 'weapon'
                });
                var box = document.querySelector('.box');
                var styleTop = window.getComputedStyle(box, null).getPropertyValue('top');
                var styleLeft = window.getComputedStyle(box, null).getPropertyValue('left');
                projectile.prepend('<img class="weapon2">');
                sprite[0].style.top = styleTop;
                sprite[0].style.left = styleLeft;
                projectile[0].style.top = styleTop;
                projectile[0].style.left = styleLeft;
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
                clearInterval(timer);
                var slide = setInterval(function() {
                    var count = 0;
                    var animation = setInterval(function() {
                        $('.orb').attr('src', orb[count].src);
                        count++;
                        if(count > 2) {
                            count = 0;
                        }
                        var enemyPosX = parseInt(enemyX);
                        if(enemyPosX == 900 || enemyPosX == 0) {
                            clearInterval(animation);
                            $('.orb').attr('src', 'images/Enemy.png')
                        }   
                    },120);
                    if (attack2 == 1) {enemy.css({'left' : '+=100px'})};
                    if (attack2 == 2) {enemy.css({'left' : '-=100px'})};
                    game.collision();
                    var gameOver = levelUp[0].gameover;
                    console.log(gameOver)
                    if(gameOver) {
                        clearInterval(slide)
                        game.enemy();
                        levelUp[0].gameover = false;
                    }
                    var enemyPosX = parseInt(enemyX);
                    if(enemyPosX == 900 || enemyPosX == 0) {
                        clearInterval(slide);
                        game.enemy();
                    }   
                },150);
            };
            if (attack > .50) {
                var attack2 = Math.floor(Math.random()*4);
                if(attack2 == 1 && enemyPosX < 900) {
                    normalAttack();
                }
                if (attack2 == 2 && enemyPosX > 0) {
                    normalAttack();
                }
            }
        };
    },
    reset: function() {
        setTimeout(function() {
            $('.notification').animate({
                'opacity' : '1'
            },500);
            setTimeout(function() {
                $('.notification').animate({
                    'opacity' : '0'
                },500)
            },1000)
            $('.score').html('<p class="score">' + 1 + '</p>');
            $('.enemy').css({
                'left' : '900px',
                'top' : '300px'
            });
            $('.redBox').css({
                'width' : '150px'
            });
            $('.box').css({
                'top' : '300px',
                'left' : '0px'
            });
            pause = true;
            levelUp[0].pause = true;
            levelUp[0].speed = 400;
            for ( var i=0; i<3; i++) {
            var lives = $('<div>', {
                'class' : 'miniBox'
            });
            $('.playerHealth').append(lives);
            }
        },100)
    },
    collision: function() {
        weaponY = $('.gridBoxMini').css('top');
        weaponX = $('.gridBoxMini').css('left');
        enemyY = $('.enemy').css('top');
        enemyX = $('.enemy').css('left');
        boxY = $('.box').css('top');
        boxX = $('.box').css('left');
        if (boxY == enemyY && boxX == enemyX) {
            //Collision detection
            var lose = $('.playerHealth').find('.miniBox').length;
            if(lose == 1) {
                game.reset();
                levelUp[0].gameover = true;
            }
            var lives = document.querySelector('.miniBox');
            lives.remove();
        }
        if (weaponX == enemyX && weaponY == enemyY) {
            //If you damage the enemy
            $('.redBox').css({
                'width' : '-=50px'
            })
            game.effects();
            if(levelUp[0].pause === true) {
                $('.redBox').css({
                    'width' : '+=50px'
                })
                console.log(levelUp[0].pause)
            }
            var enemyHealth = $('.redBox').css('width');
            var enemyHealthInt = parseInt(enemyHealth);
            if(enemyHealthInt == 0) {
                //Enemy is defeated
                var speed = levelUp[0].speed;
                var level = levelUp[0].level;
                var currentLevel = level += 1;
                var speed2 = speed -= 50;
                levelUp[0].level = currentLevel;
                levelUp[0].speed = speed2;
                $('.score').html('<p class="score">' + currentLevel + '</p>');
                $('.enemy').css({
                    'left' : '900px',
                    'top' : '300px'
                });
                $('.box').css({
                    'top' : '300px',
                    'left' : '0px'
                });
                setTimeout(function() {
                    alert('You have cleared this level.')
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