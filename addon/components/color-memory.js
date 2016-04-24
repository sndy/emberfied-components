import Ember from 'ember';
import layout from '../templates/components/color-memory';

export default Ember.Component.extend({
    layout: layout,
    tag: 'div',
    gridSize: 4, //default grid Size
    matchAmt: 2, //num of cards to match each turn - don't need to be factor of gridSize*gridSize
    defaultDifficulty: 2, //normal
    flippedCards: [], //to keep track of values of flipped cards
    cardsMatch: false,
    currentScore: 0,
    cursor: {
        x: 0,
        y: 0,
        xlimit: 3, //game grid x
        ylimit: 3, //game grid y
        submitylimit: 2, //*hardcode* 0: name, 1: email, 2: submit <- > cancel
        focus: 'game', //interaction areas - game, restart, submit, newgame
        pixelW: 0,
        pixelH: 0,
        cssTop: 0,
        cssLeft: 0,
        moveX: 0, //amount to move between cards
        moveY: 0,
        init (newfocus, gridx, gridy) {
            this.setfocus(newfocus);
            this.setlimits(gridx, gridy);

            var firstCard = Ember.$('#board .card:eq(0)');
            var rightCard = Ember.$('#board .card:eq(1)');
            var belowCard = Ember.$('#board .card:eq(' + (gridx + 1) + ')');

            this.pixelW = firstCard.outerWidth() + 10;
            this.pixelH = firstCard.outerHeight() + 10;
            this.cssTop = firstCard.position().top;
            this.cssLeft = firstCard.position().left;

            this.moveX = rightCard.position().left - this.cssLeft;
            this.moveY = -(this.cssTop - belowCard.position().top);

            this.updatePosition(this.cssTop, this.cssLeft);
            this.updateSize(this.pixelW, this.pixelH);
        },
        updateSubmitCursor() {
            this.updatePosition(288, 302);
            this.updateSize(96, 46);
        },
        updatePosition(t, l) {
            this.cssTop = t;
            this.cssLeft = l;
            Ember.$('#cursor').css('top', t + 'px').css('left', l + 'px');
        },
        updateSize(w, h) {
            this.pixelW = w;
            this.pixelH = h;
            Ember.$('#cursor').css('width', w + 'px').css('height', h + 'px');
        },
        setfocus(newfocus) {
            this.x = 0;
            this.y = 0;
            this.focus = newfocus;

            if (newfocus === 'submit') {
                this.updateSubmitCursor();
            }
        },
        getfocus() {
            return this.focus;
        },
        getpos() {
            return [this.x, this.y];
        },
        setx(newx) {
            this.x = newx;
        },
        sety(newy) {
            this.y = newy;
        },
        setlimits(gridx, gridy) {
            this.xlimit = gridx - 1;
            this.ylimit = gridy - 1;
        },
        up() { //game, submit
            if (this.focus === 'game') {
                if (this.y > 0) {
                    this.y = this.y - 1;
                    this.updatePosition(this.cssTop - this.moveY, this.cssLeft);
                }

            } else if (this.focus === 'submit') {
                if (this.y === this.submitylimit) { //move up from the buttons
                    this.x = 0;
                }

                if (this.y > 0) {
                    this.y = this.y - 1;
                }

                Ember.$('#board-container .completed .popup input:eq(' + this.y + ')').focus();

                this.updateSubmitCursor();
            }

            console.log(this.getfocus() + ' - ' + this.getpos());
        },
        down() { //game, submit
            if (this.focus === 'game') {
                if (this.y < this.ylimit) {
                    this.y = this.y + 1;
                    this.updatePosition(this.cssTop + this.moveY, this.cssLeft);
                }
            } else if (this.focus === 'submit') {
                if (this.y < this.submitylimit) {
                    this.y = this.y + 1;
                    Ember.$('#board-container .completed .popup input:eq(' + this.y + ')').focus();
                }

                if (this.y === this.submitylimit) {
                    Ember.$('#board-container .completed .popup input:eq(1)').blur(); //blur the email field
                }

                this.updateSubmitCursor();
            }

            console.log(this.getfocus() + ' - ' + this.getpos());
        },
        left() { //game, restart, submit(the 2 buttons)
            if (this.focus === 'game') {
                if (this.x > 0) {
                    this.x = this.x - 1;
                    this.updatePosition(this.cssTop, this.cssLeft - this.moveX);
                }

            } else if (this.focus === 'restart') {
                this.focus = 'game';
                this.x = this.xlimit;
                this.y = this.ylimit;

                //calculate position of the last card
                var lastIndex = ((this.xlimit + 1) * (this.ylimit + 1)) - 1;
                var lastCard = Ember.$('#board .card:eq(' + lastIndex + ')');

                var lastTop = lastCard.position().top;
                var lastLeft = lastCard.position().left;
                var lastW = lastCard.outerWidth() + 10;
                var lastH = lastCard.outerHeight() + 10;

                this.updatePosition(lastTop, lastLeft);
                this.updateSize(lastW, lastH);
            } else if (this.focus === 'submit') { //cancel button to submit button
                if ((this.x === 1) && (this.y === this.submitylimit)) {
                    this.x = 0;
                }

                this.updateSubmitCursor();
            }

            console.log(this.getfocus() + ' - ' + this.getpos());
        },
        right() { //game, submit(the 2 buttons)
            if (this.focus === 'game') {
                if (this.x < this.xlimit) {
                    this.x = this.x + 1;
                    this.updatePosition(this.cssTop, this.cssLeft + this.moveX);
                } else if (this.x === this.xlimit) //go to Restart
                {
                    this.focus = 'restart';

                    this.updatePosition(490, 517);
                    this.updateSize(186, 46);
                }
            } else if (this.focus === 'submit') { //submit button to cancel button
                if ((this.x === 0) && (this.y === this.submitylimit)) {
                    this.x = 1;
                }

                this.updateSubmitCursor();
            }

            console.log(this.getfocus() + ' - ' + this.getpos());
        },
        enter() { //game, restart, submit, newgame
            if (this.focus === 'game') {
                var cardIndex = (this.y * (this.xlimit + 1)) + this.x;
                Ember.$('#board .card:eq(' + cardIndex + ')').trigger('click');
            } else if (this.focus === 'restart') {
                Ember.$('.right .restart button').trigger('click');
            } else if (this.focus === 'submit') {
                if (this.y === this.submitylimit) { //submit or cancel
                    if (this.x === 0) {
                        Ember.$('#board-container .completed .popup .submit').trigger('click');
                    }
                }
            } else if (this.focus === 'newgame') {
                Ember.$('#board .newgame button').trigger('click');
            }
        }
    },
    didInsertElement() {
        //init restart button
        Ember.$('.right .restart button').unbind('click').on('click', ()=> {
            this.startNewGame(this.gridSize, this.gridSize, this.matchAmt);
        });

        this.startNewGame(this.gridSize, this.gridSize, this.matchAmt);
    },
    makeGameCards(h, w, m) {

        //Take note! matchAmt may not be a factor of height*width

        var remain = (h * w) % m;
        var cardsToGenerate = (h * w) - remain;

        var total = 0;
        for (var i = 0; i < h; i++) { //row
            Ember.$('#ref .cardrow').clone().appendTo('#board');

            for (var j = 0; j < w; j++) { //cards
                Ember.$('#ref .card').clone().appendTo('#board .cardrow:eq(' + i + ')');
                total++;

                if (total >= cardsToGenerate) {
                    return cardsToGenerate;
                }
            }
        }

        return cardsToGenerate;
    },
    makeRandomColours(limit, matchAmt) {
        //colours must not be too similar to each other or players will get frustrated
        //make them permutations of 0, 3, 6, 9, C, F?

        var htmlcol = '0369CF';
        var colours = [];
        var colourcount = 0;

        //while loop start
        while (colourcount < limit) {
            var combo = '';
            for (var i = 0; i < 3; i++) {
                var cpos = Math.floor(Math.random() * htmlcol.length);
                combo += htmlcol[cpos];
            }

            if (colours.indexOf(combo) === -1) { //not in array
                colours.push(combo);
                colourcount++;
            }
        }

        //colour generation complete
        //now we assign the colours
        var assignedcol = [];
        var assignednum = [];

        for (var j = 0; j < limit; j++) {
            //determine which cards' index we will assign each colour to
            var insertedcount = 0;

            while (insertedcount < matchAmt) {
                var apos = Math.floor(Math.random() * (limit * matchAmt));
                if (typeof (assignedcol[apos]) === 'undefined') //nothing in the slot
                {
                    assignedcol[apos] = colours[j];
                    assignednum[apos] = j;
                    insertedcount++;
                }
            }
        }

        Ember.$('#board .card .front').each((i, elem) => {
            Ember.$(elem).css('background-color', '#' + assignedcol[i]);
            Ember.$(elem).find('.txt').html(assignednum[i]);
        });

        return {
            cols: assignedcol,
            nums: assignednum
        };
    },
    initKeyboardControls () {
        //keys allowed are up(38), down(40), left(37), right(39) enter(13), tab(9)
        Ember.$(document).unbind('keydown').keydown((e)=> {
            switch (e.which) {
                case 38: this.cursor.up(); break;
                case 40: this.cursor.down(); break;
                case 37: this.cursor.left(); break;
                case 39: this.cursor.right(); break;
                case 13: this.cursor.enter(); break;
                case 9: e.preventDefault(); break;
                }
        });
    },
    startNewGame(h, w, m) {
        //clear existing cards
        Ember.$('#board').html('');

        //initialise score
        this.set('currentScore', 0);

        //generate the cards
        var totalCards = this.makeGameCards(h, w, m);

        //init cursor
        this.cursor.init('game', w, h);

        //give them random colours + numbers
        var cardVals = this.makeRandomColours(totalCards / m, m);

        //add click events + game logic to the cards
        this.initPlayLogic(cardVals, m, totalCards);

        //init Keyboard controls
        this.initKeyboardControls();
    },
    gameCompleted () {
        //clear board
        Ember.$('#board').html('');

        //show popup for user to enter Name and email
        Ember.$('#ref .completed').clone().appendTo('#board-container');

        var popup = Ember.$('#board-container .completed .popup');

        //focus on the first input field
        this.cursor.setfocus('submit');
        popup.find('.submit').focus();

        //Submit button
        popup.find('.submit').unbind('click').on('click', ()=> {
            popup.addClass('insertok');
		    popup.html('Yolo');
		    Ember.$('#board-container .completed').css('z-index', '999'); //set it above the cursor

		    this.cursor.setfocus('newgame');

		    //HARDCODE
		    this.cursor.updatePosition(265, 172);
		    this.cursor.updateSize(166, 45);

		    //Let user stare at rank for 1.5 second then fade out
		    setTimeout(()=> {
		        Ember.$('#board-container .completed').fadeOut(300, ()=> {
		            Ember.$('#board-container .completed').remove();
		        });
		    }, 1500);
        });


        //add Start New Game button
        this.addRestart('#board .newgame');
    },
    addRestart (restartHolder) {
	    Ember.$('#ref .newgame').clone().appendTo('#board');

	    //add logic for new game button
	    Ember.$(restartHolder).find('button').unbind('click').on('click', ()=> {
	    	this.startNewGame(this.gridSize, this.gridSize, this.matchAmt);
	    });
	},
    initPlayLogic(cardVals, matchAmt, totalCards) {
        let _this  = this;
        Ember.$('#board .card:not(.hidden)').each(function  (i, card) {
            Ember.$(card).unbind('click').on('click', function () {

                if (!Ember.$(card).hasClass('hidden')) {
                    //Take note! Each card takes 600ms to flip over
                    if (Ember.$('#board .card.flipped:not(.hidden)').length < matchAmt) {
                        Ember.$(this).addClass('flipped');
                        _this.flippedCards.push(cardVals.nums[i]);

                        if (Ember.$('#board .card.flipped:not(.hidden)').length >= matchAmt) {
                            //work out whether the flipped cards match or not
                            for (var j = 1; j < _this.flippedCards.length; j++) {
                                if (_this.flippedCards[j] !== _this.flippedCards[0]) {
                                    _this.cardsMatch = false;
                                    break;
                                } else {
                                    _this.cardsMatch = true;
                                }
                            }

                            if (_this.cardsMatch === true) {
                                _this.set('currentScore', _this.get('currentScore')+1);

                                setTimeout(()=> {
                                    Ember.$('#board .card.flipped').addClass('hidden');
                                    _this.flippedCards = [];
                                    _this.cardsMatch = false;

                                    if (Ember.$('#board .card.hidden').length === totalCards) {
                                        _this.gameCompleted(_this.get('currentScore'));
                                    }
                                }, 300);
                            } else //no match
                                {
                                    _this.set('currentScore', _this.get('currentScore')-1);

                                    //unflip cards
                                    setTimeout(()=> {
                                        Ember.$('#board .card').removeClass('flipped');
                                        _this.flippedCards = [];
                                        _this.cardsMatch = false;
                                    }, 600);
                                }
                        }
                    }
                } //end if (!$(card).hasClass('hidden'))
            }); //end onclick
        });
    }
});
