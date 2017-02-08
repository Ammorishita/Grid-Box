$(document).ready(function() {
    for (var i=0; i<70; i++) {
        var $div = $('<div>', {
            'class' : 'gridBox'
        });
        $('.grid').append($div);
    }
    pause = true;
});

var plasmaWeapon = [
    {   
        'title' : 'Energy Weapon',
        'src' : 'images/Flame1.png'
    },
    {   
        'title' : 'Energy Weapon',
        'src' : 'images/Flame2.png'
    },
    {   
        'title' : 'Energy Weapon',
        'src' : 'images/Flame3.png'
    }
];
var missileWeapon = [
    {
        'src' : 'images/Missile1.png'
    },
    {
        'src' : 'images/Missile2.png'
    },
    {
        'src' : 'images/Missile3.png'
    },
    {
        'src' : 'images/Missile4.png'
    }
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
];
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
function preloadImages(src, imgs) {
    var img;
    var remaining = src.length;
    for (var i = 0; i < src.length; i++) {
        img = new Image();
        img.onload = function() {
            --remaining;
            if (remaining <= 0) {
                //callback()
            }
        };
        img.src = src[i].src;
        imgs.push(img);
    }
}
var images = [];
preloadImages(effects, images);
preloadImages(orb, images);

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '83') {
        //s key
        var active = $('.selected');
        active.removeClass('selected')
        active.next().addClass('selected')
        if($(active).is(':last-child')) {
            $('.weapon:first').addClass('selected')
        }
    }
    if (e.keyCode == '38') {
        $('.player').css({'top' : '-=100px'});
        //up arrow
    }
    else if (e.keyCode == '40') {
        $('.player').css({'top' : '+=100px'});
        //down arrow
    }
    else if (e.keyCode == '37') {
        $('.player').css({'left' : '-=100px'});
        //left arrow
    }
    else if (e.keyCode == '39') {
        $('.player').css({'left' : '+=100px'});
        //right arrow
    }
    game.collision();
    game.offScreen();
};

var boxX, enemyY, enemyX, boxY, pause, weaponY, weaponX, animation;
var game = {
    init: function() {
        this.offScreen();
        this.collision();
        this.enemy();
        this.menu();
        this.player();
    },
    pause: function() {
        levelUp[0].pause = false;
    },
    menu: function() {
        $('.gameplay').click(function() {
            var clicks = $(this).data('clicks');
            if (clicks) {
            // odd clicks
                pause = false;
                $('.instructions').css({
                    'opacity' : 0 
                })
                game.pause();
            } else {
            // even clicks
                pause = true;
                $('.instructions').css({
                    'opacity' : 1 
                })
            }
            $(this).data("clicks", !clicks);
        });
    },
    plasmaWeapon: function() {
        var count = 0;
        var missile = setInterval(function() {
            if($('.plasma').hasClass('selected')) {
                $('.weapon2').attr({
                    'src' : plasmaWeapon[count].src, 
                    'height' : 100
                });
            }
            count++;
            if(count > 2) {
                count = 0;
            }
            var missileX = parseInt($('.gridBoxMini').css('left'));
                if(missileX == 900) {
                clearInterval(missile)
            }
        },80);
    },
    missileWeapon: function() {
        var count = 0;
        var missile = setInterval(function() {
            if($('.missile').hasClass('selected')) {
                $('.weapon3').attr({
                    'src' : missileWeapon[count].src, 
                    'height' : 100
                });
            }
            count++;
            if(count > 3) {
                count = 0;
            }
            var missileX = parseInt($('.gridBoxMini').css('left'));
            if(missileX == 900) {
                clearInterval(missile)
            }
        },80);
    },
    effects: function() {
        var count = 0;
        var audio = new Audio('audio/Bomb.mp3')
        var length = effects.length - 1;
        audio.volume = .15;
        audio.play();
        var animation = setInterval(function() {
            $('.effects').css({
                'left' : enemyX,
                'top' :  enemyY
            })
            $('.effects').attr('src', effects[count].src);
            count++;
            if(count > length) {
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
                var laser = $('<div>', {
                    'class' : 'laserBox'
                });
                var box = document.querySelector('.player');
                var styleTop = window.getComputedStyle(box, null).getPropertyValue('top');
                var styleLeft = window.getComputedStyle(box, null).getPropertyValue('left');
                projectile[0].style.top = styleTop;
                projectile[0].style.left = styleLeft;

                function plasmaAttack() {
                    var audio;

                    if($('.missile').hasClass('selected')) {
                        game.missileWeapon();
                        audio = new Audio('audio/Missile.mp3')
                        audio.volume = 0.2;
                        audio.play();
                    } else {
                        audio = new Audio('audio/Plasma.mp3')
                        game.plasmaWeapon();
                        audio.volume = 0.2;
                        audio.play();
                    }
                    $('.grid').append(projectile);
                    var interval = setInterval(function() {
                        $('.gridBoxMini').css({'left' : '+=100px'});
                        var projectileX = $('.gridBoxMini').css('left');
                        var projectileXInt = parseInt(projectileX);
                        game.collision();
                        if(projectileXInt > 900) {
                            clearInterval(interval);
                            audio.pause();
                            $('.gridBoxMini').remove();
                            document.onkeydown = checkKey;
                            document.addEventListener('keydown', attacking, false);
                        }
                    },100);
                    document.onkeydown = disable;
                    function disable(e) {
                        e = e || window.event;
                    }
                };
                function laserAttack() {
                    $('.grid').append(projectile);
                    var audio = new Audio('audio/Laser Blast.wav')
                    audio.volume = 0.2;
                    audio.play();
                    var totalLength = parseInt($('.grid').css('width'))
                    var currentPos = parseInt(styleLeft)
                    var length = (totalLength - currentPos) - 100;
                    var laserLength = (length / 100);
                    var laserStyleLeft = parseInt(styleLeft) + 100 + 'px'
                    document.onkeydown = disable;
                    function disable(e) {
                        e = e || window.event;
                    }
                    laser.css({
                        'width' : length + 'px',
                        'left' : laserStyleLeft,
                        'top' : styleTop
                    });
                    $('.grid').append(laser);
                    var laserCount = setInterval(function() {
                        laser.prepend('<img class="weapon4">');
                        $('.gridBoxMini').css({'left' : '+=100px'});                       
                        $('.weapon4').attr({
                            'src' : 'images/LaserBeam.png',
                            'width' : 100
                        });
                        game.collision();
                        laserLength--;
                        if(laserLength == -1) {
                            clearInterval(laserCount)
                            laser.remove();
                            $('.gridBoxMini').remove();
                            document.onkeydown = checkKey;
                            document.addEventListener('keydown', attacking, false);
                        }                       
                    },40)

                };

                if($('.plasma').hasClass('selected')) {
                    projectile.prepend('<img class="weapon2">');
                    plasmaAttack();

                } else if ($('.missile').hasClass('selected')) {
                    projectile.prepend('<img class="weapon3">');
                    plasmaAttack();
                } else if ($('.laser').hasClass('selected')) {
                    laserAttack();
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
        var speedInterval = function() {
            move();
            attack();
            var speed = levelUp[0].speed;
            clearInterval(timer)
            timer = setInterval(speedInterval, speed)
        };
        var timer = setInterval(speedInterval, levelUp[0].speed)

        var Weapon = function(src) {
            var box = document.querySelector('.enemy');
            var styleTop = window.getComputedStyle(box, null).getPropertyValue('top');
            var styleLeft = window.getComputedStyle(box, null).getPropertyValue('left');
            var choice = Math.random();
            this.element = document.createElement('div');
            this.element.className += "enemyWeapon";
            this.element.style.left = styleLeft;
            this.element.style.top = styleTop;
            this.img = document.createElement('img');
            this.img.setAttribute("height", "100");
            this.img.setAttribute("src", src);
            this.element.prepend(this.img);
            this.update();
            this.x = parseInt(this.element.style.left);
            if(choice > .5) {
                $('.grid').append(this.element);   
            } else {
                return
            }
        };
        Weapon.prototype.update = function() {
            $('.enemyWeapon').animate({
                'left' : '0px'
            },1500,'linear')
            this.render();
            this.collide();
        };
        Weapon.prototype.collide = function() {           
            var id;
            function collide() {
                var el = document.querySelector('.enemyWeapon');
                var player = document.querySelector('.player')
                var rect = el.getBoundingClientRect();
                var enemyX = rect.left;
                var enemyY = rect.top;
                var playerX = parseInt($('.player').css('left'));
                var playerY = parseInt($('.player').css('top'));
                console.log('ITS RUNNING RIGHT NOW')
                id = requestAnimationFrame(collide);
                if((enemyY <= playerY + 20) && (enemyY >= playerY - 20) && (enemyX <= playerX + 99) && (enemyX >= playerX - 99)) {
                    var playerLives = $('.playerHealth').find('.miniBox').length;
                    if(playerLives == 1) {
                        console.log('CLEARING EVERYTHING')
                        game.reset();
                        levelUp[0].gameover = true;
                    }
                    var lives = document.querySelector('.miniBox');
                    lives.remove();
                    console.log('one life has been removed')
                    cancelAnimationFrame(id)
                }
            }
            requestAnimationFrame(collide)            
        };
        Weapon.prototype.render = function() {
            var weapon = document.querySelectorAll('div.enemyWeapon')
            var el = document.querySelector('.enemyWeapon');
            var player = document.querySelector('.player')
            var posX = parseInt(player.style.left);
            if(el) {
                for (i=0; i<weapon.length; i++) {
                    if(weapon[i].style.left == '0px') {
                        weapon[i].remove();                 
                    }
                }
            }
        };
        function attack() {
            if(pause) {return}
            var enemy = new Weapon('images/Black Hole.png')
        };

        function move() {
            if (pause == true) {return};
            var newEnemyX = parseInt(enemyX);
            var newEnemyY = parseInt(enemyY);
            var choice = Math.floor(Math.random() * 4);
            console.log(choice)
            if (choice == 0) {enemy.css({'left' : '-=100px'})}
            if (choice == 1) {enemy.css({'left' : '+=100px'})}
            if (choice == 2) {enemy.css({'top' : '-=100px'})}
            if (choice == 3) {enemy.css({'top' : '+=100px'})}
            if (choice == 0 && newEnemyX < 100) {enemy.css({'left' : '+=100px'})}
            if (choice == 1 && newEnemyX > 800) {enemy.css({'left' : '-=100px'})}
            if (choice == 2 && newEnemyY < 100) {enemy.css({'top' : '+=100px'})}
            if (choice == 3 && newEnemyY > 500) {enemy.css({'top' : '-=100px'})}
            //If enemy is at left side of the grid, moves down or left.
            if (choice == 0 && newEnemyX < 100) {
                var secondChoice = Math.floor(Math.random() * 2);
                console.log(secondChoice)
                if(secondChoice == 1 && newEnemyY  < 500) {
                    enemy.css({'top' : '+=100px'});                           
                } else {
                    enemy.css({'left' : '+=100px'});   
                }
            }
            //If enemy at right side of the grid will move left or down.
            if (choice == 1 && newEnemyX == 800) {
                var secondChoice = Math.floor(Math.random() * 2);
                if(secondChoice == 1 && newEnemyY  < 500) {
                    enemy.css({'top' : '+=100px'});                           
                } else {
                    enemy.css({'left' : '-=100px'});   
                }
            }
            game.collision();
        };

    },
    reset: function() {
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
        $('.player').css({
            'top' : '300px',
            'left' : '0px'
        });
        pause = true;
        levelUp[0].pause = true;
        levelUp[0].speed = 400;
        for (var i=0; i<16; i++) {
            var lives = $('<div>', {
                'class' : 'miniBox'
            });
            $('.playerHealth').append(lives)
        }
    },
    collision: function() {
        weaponY = $('.gridBoxMini').css('top');
        weaponX = $('.gridBoxMini').css('left');
        enemyY = $('.enemy').css('top');
        enemyX = $('.enemy').css('left');
        boxY = $('.player').css('top');
        boxX = $('.player').css('left');
        var enemyWeaponX = $('.enemyWeapon').css('left')
        var enemyWeaponY = $('.enemyWeapon').css('top')
        if ((boxY == enemyY && boxX == enemyX)) {
            //Collision detection
            var playerLives = $('.playerHealth').find('.miniBox').length;
            if(playerLives == 1) {
                console.log('CLEARING EVERYTHING')
                game.reset();
                levelUp[0].gameover = true;
            }
            var lives = document.querySelector('.miniBox');
            lives.remove();
        }
        if (weaponX == enemyX && weaponY == enemyY) {
            //If you damage the enemy
            if ($('.laser').hasClass('selected')) {
                $('.redBox').css({
                    'width' : '-=50px'
                });                
            } else {
                $('.redBox').css({
                    'width' : '-=50px'
                }); 
            }
            game.effects();
            if(levelUp[0].pause === true) {
                if($('.laser').hasClass('selected')) {
                    $('.redBox').css({
                        'width' : '+=10px'
                    });  
                } else {
                    $('.redBox').css({
                        'width' : '+=50px'
                    });
                }
            }
            var enemyHealth = $('.redBox').css('width');
            var enemyHealthInt = parseInt(enemyHealth);
            if(enemyHealthInt == 0) {
                //Enemy is defeated
                levelUp[0].speed -= 50;
                if(levelUp[0].speed == 150) {levelUp[0].speed = 200}
                    console.log(levelUp[0].speed)
                var level = levelUp[0].level;
                var currentLevel = level += 1;
                $('.score').html('<p class="score">' + currentLevel + '</p>');
                $('.enemy').css({
                    'left' : '900px',
                    'top' : '300px'
                });
                $('.player').css({
                    'top' : '300px',
                    'left' : '0px'
                });
                setTimeout(function() {
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
            $('.player').css({'left' : '-=100px'});
        }
        if(newBoxX < 0) {
            $('.player').css({'left' : '+=100px'});
        }
        if(newBoxY < 0) {
            $('.player').css({'top' : '+=100px'});
        }
        if(newBoxY > 600) {
            $('.player').css({'top' : '-=100px'});
        }
    }
};
game.init();