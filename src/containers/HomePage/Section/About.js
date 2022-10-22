import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Pink Venom
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/gQlMMD8auMs" 
                            title="BLACKPINK - ‘Pink Venom’ M/V" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            Makes no sense, you couldn't get a dollar out of me
                            자, 오늘 밤이야, 난 독을 품은 꽃
                            네 혼을 빼앗은 다음, look what you made us do
                            천천히 널 잠재울 fire
                            잔인할 만큼 아름다워 I bring the pain like
                            This that pink venom, this that pink venom
                            This that pink venom get 'em, get 'em, get 'em
                            Straight to ya dome like whoa-whoa-whoa
                            Straight to ya dome like ah-ah-ah
                            Rest in peace, please, light up a candle
                            This the life of a vandal, masked up, and I'm still in CELINE
                            Designer crimes, or it wouldn't be me, ooh!
                            Diamonds shining, drive in silence, I don't mind it, I'm riding
                            Flying private side by side with the pilot up in the sky
                            And I'm wyling, styling on them and there's no chance
                            'Cause we got bodies on bodies like this a slow dance
                            자, 오늘 밤이야, 난 독을 품은 꽃
                            네 혼을 빼앗은 다음, look what you made us do
                            천천히 널 잠재울 fire
                            잔인할 만큼 아름다워 I bring the pain like
                            Straight to ya dome like whoa-whoa-whoa
                            Straight to ya dome like ah-ah-ah
                            원한다면 provoke us
                            감당 못해 and you know this
                            이미 퍼져버린 shot that potion
                            네 눈앞은 핑크빛 ocean
                            Come and give me all the smoke
                            도 아니면 모 like I'm so rock and roll
                            Come and give me all the smoke
                            다 줄 세워 봐, 자, stop, drop I bring the pain like
                            라타타타, 트라타타타
                            라타타타, 트라타타타
                            라타타타, 트라타타타
                            Straight to ya, straight to ya, straight to ya dome like
                            라타타타, 트라타타타 BLACKPINK
                            라타타타, 트라타타타 BLACKPINK
                            라타타타, 트라타타타 BLACKPINK
                            I bring the pain like
                        </p>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
