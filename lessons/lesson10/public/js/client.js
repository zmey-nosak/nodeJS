$.ready = function () {
    var socket = io.connect('http://localhost:8080');
    var game = new Game($('#container'), socket);
    game.start();
};

function Game(container, socket) {
    this.socket = socket;

    this.currPlayerYou = false;

    this.name;

    this.$container = $(container);

    this.youFirstPlayer = false;

    this.currNumRoom = -1;
    this.start = function () {
        this.showInputNameForm();
        var that = this;
        this.socket.on('startGame', function (data) {
            that.currNumRoom = data.numRoom;
            that.$container.empty();
            that.$container.html(
                '<table>' +
                '<tr>' +
                '<td data-id="0"></td>' +
                '<td data-id="1"></td>' +
                '<td data-id="2"></td>' +
                '</tr>' +
                '<tr>' +
                '<td data-id="3"></td>' +
                '<td data-id="4"></td>' +
                '<td data-id="5"></td>' +
                '</tr>' +
                '<tr>' +
                '<td data-id="6"></td>' +
                '<td data-id="7"></td>' +
                '<td data-id="8"></td>' +
                '</tr>' +
                '</table>');
            that.$container.on('click', step);
        });
        this.socket.on('nextTurn', function (data) {
            //1.обновить поле
            for (var i = 0; i < 9; i++) {
                that.$container.find('[data-id=' + i + ']').text(data.area[i]);
            }
            //2. передать ход
            that.currPlayerYou = true;
        });
    };
    var that = this;

    function step(event) {
        if (that.currPlayerYou) {
            if (event.target.tagName === 'TD'
                && $(event.target).text().length === 0) {
                if (that.youFirstPlayer) {
                    $(event.target).text('X');
                } else {
                    $(event.target).text('0');
                }
                that.currPlayerYou = false;
                //сбор данных из ячеек
                var area = [];
                for (var i = 0; i < 9; i++) {
                    area.push(that.$container.find('[data-id=' + i + ']').text());
                }
                that.socket.emit('changeTurn', {
                    area: area,
                    numRoom: that.currNumRoom,
                    playerName: that.name
                })
            }
        }
    }

    this.showInputNameForm = function () {
        that.$container.html('<input type="text"><button>Отправить</button>');
        that.$container.find('button').on('click', sendName);
    };

    var that = this;

    function sendName(event) {
        that.name = that.$container.find('input').val();
        that.$container.empty();
        that.socket.emit('ready', that.name);
        that.socket.on('wait', function (message) {
            that.youFirstPlayer = true;
            that.currPlayerYou = true;
            that.$container.html('<p>' + message + '</p>');
        });

    }
}