import { faThumbsUp, faThumbsDown, faComment, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { timeDifference } from './Utils';
import {Link} from "react-router-dom";


const tinyMCEApiKey = "bbhuxhok548nagj70vnpfkk2793rut8hifdudjna10nktqx2"

function DisplayRichText({ content }) {
    return (
        <>
            <div className="w-100 mceNonEditable">
                <Editor
                    apiKey= {tinyMCEApiKey}
                    value={content}
                    init={{
                        height: 200,
                        menubar: false,
                        toolbar: false,
                        readonly: true,
                        noneditable_class: "mceNonEditable",
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                    }}
                />
            </div>
        </>
    );
}



function TweetCard({ tweetInfo }) {
    const [likeInfo, setLikeInfo] = useState(tweetInfo['likeInfo']);
    const [dislikeInfo, setDislikeInfo] = useState(tweetInfo['dislikeInfo']);
    const [commentCount, setCommentCount] = useState(tweetInfo['commentCount']);
    const [retweetCount, setRetweetCount] = useState(tweetInfo['retweetCount']);
    const [tweetUserInfo, setTweetUserInfo] = useState(tweetInfo['user']);
    const [tweetContent, setTweetContent] = useState(tweetInfo['content']);
    const [timeInterval, setTimeInterval] = useState(timeDifference(tweetInfo['time']));
    const [portraitUrl, setPortraitUrl] = useState(tweetInfo['portraitUrl']);

    const clickLikeTweet = () => {
        let updatedLikeInfo = { ...likeInfo };
        updatedLikeInfo.bLikeByUser = !updatedLikeInfo.bLikeByUser;
        if (updatedLikeInfo.bLikeByUser) {
            updatedLikeInfo.likeCount += 1;
            if (dislikeInfo.bDislikeByUser) {
                let updatedDislikeInfo = { ...dislikeInfo };
                updatedDislikeInfo.bDislikeByUser = !updatedDislikeInfo.bDislikeByUser;
                updatedDislikeInfo.dislikeCount -= 1;
                setDislikeInfo(updatedDislikeInfo);
            }
        } else {
            updatedLikeInfo.likeCount -= 1;
        }
        setLikeInfo(updatedLikeInfo);
        updateTweetInfoToDB();
    }

    const clickDislikeTweet = () => {
        let updatedDislikeInfo = { ...dislikeInfo };
        updatedDislikeInfo.bDislikeByUser = !updatedDislikeInfo.bDislikeByUser;
        if (updatedDislikeInfo.bDislikeByUser) {
            updatedDislikeInfo.dislikeCount += 1;
            if (likeInfo.bLikeByUser) {
                let updatedLikeInfo = { ...likeInfo };
                updatedLikeInfo.bLikeByUser = !updatedLikeInfo.bLikeByUser;
                updatedLikeInfo.likeCount -= 1;
                setLikeInfo(updatedLikeInfo);
            }
        } else {
            updatedDislikeInfo.dislikeCount -= 1;
        }
        setDislikeInfo(updatedDislikeInfo);
        updateTweetInfoToDB();
    }

    const updateTweetInfoToDB = () => {
        console.log("Updated tweet info to DB");
    }

    return (
        <div className="card p-2 m-2 mb-4" style={{ borderRadius: "30px" }}>
            <div className="card-body row">
                <div className="col-2">
                    <div>
                        <div className="d-flex justify-content-center">
                            <img src={portraitUrl} alt="Generic placeholder image" className="img-fluid" style={{ width: "100px", height: "100px", borderRadius: "50px" }} />
                        </div>
                        <h3 className="my-2 text-bold text-center">{tweetUserInfo.username}</h3>
                        <hr />
                        <p className="opacity-50 text-nowrap text-center">{timeInterval}</p>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-12 mb-2">
                            <DisplayRichText content={tweetContent} />
                        </div>
                        <div className="col-12">
                            <span className="m-1">
                                <button type="button" className="btn btn-primary btn-floating">View Full Tweet</button>
                            </span>
                            <span className="m-1">
                                <button type="button" className={"btn btn-" + (likeInfo.bLikeByUser ? "" : "outline-") + "primary btn-floating"} onClick={clickLikeTweet}>
                                    <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                                </button>
                                <span className="ms-1 opacity-75">{likeInfo.likeCount}</span>
                            </span>
                            <span className="m-1">
                                <button type="button" className={"btn btn-" + (dislikeInfo.bDislikeByUser ? "" : "outline-") + "primary btn-floating"} onClick={clickDislikeTweet}>
                                    <FontAwesomeIcon icon={faThumbsDown}></FontAwesomeIcon>
                                </button>
                                <span className="ms-1 opacity-75">{dislikeInfo.dislikeCount}</span>
                            </span>
                            <span className="m-1">
                                <button type="button" className="btn btn-outline-primary  btn-floating" data-bs-toggle="modal" data-bs-target="#tweetCommentForm" data-bs-whatever="@mdo">
                                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                                </button>
                                <span className="ms-1 opacity-75">{commentCount}</span>
                            </span>
                            <span className="m-1">
                                <button type="button" className="btn btn-outline-primary btn-floating" data-bs-toggle="modal" data-bs-target="#tweetForwardForm" data-bs-whatever="@mdo">
                                    <FontAwesomeIcon icon={faRetweet}></FontAwesomeIcon>
                                </button>
                                <span className="ms-1 opacity-75">{retweetCount}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* comment form for tweet's comment*/}
            <div class="modal fade" id="tweetCommentForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"> Tweet your comment </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <textarea className="form-control" id='new-comment' rows='5'></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Cancel </button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"> Send </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* forward tweet */}
            <div class="modal fade" id="tweetForwardForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"> Forward </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <textarea className="form-control" id='new-comment' rows='5'></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Cancel </button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"> Send </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TweetListView({ tweetInfos }) {
    const [tweetInfoList, setTweetInfoList] = useState(tweetInfos);
    return (
        <>
            <div className="container-fluid">
                {tweetInfoList.map((tweetInfo, index) =>
                    <TweetCard tweetInfo={tweetInfo} key={index} />
                )}
            </div >
        </>)
}


// function TweetCardDetail({ tweetInfo }) {
//     const [likeInfo, setLikeInfo] = useState(tweetInfo['likeInfo']);
//     const [dislikeInfo, setDislikeInfo] = useState(tweetInfo['dislikeInfo']);
//     const [commentCount, setCommentCount] = useState(tweetInfo['commentCount']);
//     const [retweetCount, setRetweetCount] = useState(tweetInfo['retweetCount']);
//     const [tweetUserInfo, setTweetUserInfo] = useState(tweetInfo['user']);
//     const [tweetContent, setTweetContent] = useState(tweetInfo['content']);
//     const [timeInterval, setTimeInterval] = useState(timeDifference(tweetInfo['time']));
//     const [portraitUrl, setPortraitUrl] = useState(tweetInfo['portraitUrl']);

//     const clickLikeTweet = () => {
//         let updatedLikeInfo = { ...likeInfo };
//         updatedLikeInfo.bLikeByUser = !updatedLikeInfo.bLikeByUser;
//         if (updatedLikeInfo.bLikeByUser) {
//             updatedLikeInfo.likeCount += 1;
//             if (dislikeInfo.bDislikeByUser) {
//                 let updatedDislikeInfo = { ...dislikeInfo };
//                 updatedDislikeInfo.bDislikeByUser = !updatedDislikeInfo.bDislikeByUser;
//                 updatedDislikeInfo.dislikeCount -= 1;
//                 setDislikeInfo(updatedDislikeInfo);
//             }
//         } else {
//             updatedLikeInfo.likeCount -= 1;
//         }
//         setLikeInfo(updatedLikeInfo);
//         updateTweetInfoToDB();
//     }

//     const clickDislikeTweet = () => {
//         let updatedDislikeInfo = { ...dislikeInfo };
//         updatedDislikeInfo.bDislikeByUser = !updatedDislikeInfo.bDislikeByUser;
//         if (updatedDislikeInfo.bDislikeByUser) {
//             updatedDislikeInfo.dislikeCount += 1;
//             if (likeInfo.bLikeByUser) {
//                 let updatedLikeInfo = { ...likeInfo };
//                 updatedLikeInfo.bLikeByUser = !updatedLikeInfo.bLikeByUser;
//                 updatedLikeInfo.likeCount -= 1;
//                 setLikeInfo(updatedLikeInfo);
//             }
//         } else {
//             updatedDislikeInfo.dislikeCount -= 1;
//         }
//         setDislikeInfo(updatedDislikeInfo);
//         updateTweetInfoToDB();
//     }

//     const updateTweetInfoToDB = () => {
//         console.log("Updated tweet info to DB");
//     }

//     return (
//         <div className="card p-2 m-2 mb-4" style={{ borderRadius: "30px" }}>
            
//             {/* user name and potrait */}
//             <div class="card col-12 border-0">
//                 <div class="card-body">
//                     <div className="d-inline-block m-2 col-2"> 
//                     {/* <Link to={'/' + this.props.name}> */}
//                         <img class="img d-inline-block m-2 rounded-circle align-middle" style={{width:"100px", height: "100px"}} src={portraitUrl} alt="Card image cap"/>
//                     {/* </Link> */}
//                     </div>
//                     <div className="d-inline-block m-2 col-2"> 
//                     <h3 className="text-bold">{tweetUserInfo.username}</h3>
//                     <p className="opacity-50 text-nowrap">{timeInterval}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-12">
//                 <div className="row">
//                     <div className="col-12 mb-2">
//                         {/* rich text TODO: can we remove border, can we auto height?*/}
//                         <div className="w-100 mceNonEditable">
//                             <Editor
//                                 apiKey= {tinyMCEApiKey}
//                                 value={"lalallalla"}
//                                 init={{
//                                     height: 500,
//                                     menubar: false,
//                                     toolbar: false,
//                                     readonly: true,
//                                     noneditable_class: "mceNonEditable",
//                                     plugins: [
//                                         'advlist autolink lists link image charmap print preview anchor',
//                                         'searchreplace visualblocks code fullscreen',
//                                         'insertdatetime media table paste code help wordcount'
//                                     ],
//                                 }}
//                             />
//                         </div>
//                     </div>
//                     <div className="col-12">
//                         {/* <span className="m-1">
//                             <button type="button" className="btn btn-primary btn-floating">View Full Tweet</button>
//                         </span> */}
//                         <span className="m-1">
//                             <button type="button" className={"btn btn-" + (likeInfo.bLikeByUser ? "" : "outline-") + "primary btn-floating"} onClick={clickLikeTweet}>
//                                 <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
//                             </button>
//                             <span className="ms-1 opacity-75">{likeInfo.likeCount}</span>
//                         </span>
//                         <span className="m-1">
//                             <button type="button" className={"btn btn-" + (dislikeInfo.bDislikeByUser ? "" : "outline-") + "primary btn-floating"} onClick={clickDislikeTweet}>
//                                 <FontAwesomeIcon icon={faThumbsDown}></FontAwesomeIcon>
//                             </button>
//                             <span className="ms-1 opacity-75">{dislikeInfo.dislikeCount}</span>
//                         </span>
//                         <span className="m-1">
//                             <button type="button" className="btn btn-outline-primary disabled btn-floating">
//                                 <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
//                             </button>
//                             <span className="ms-1 opacity-75">{commentCount}</span>
//                         </span>
//                         <span className="m-1">
//                             <button type="button" className="btn btn-outline-primary disabled btn-floating">
//                                 <FontAwesomeIcon icon={faRetweet}></FontAwesomeIcon>
//                             </button>
//                             <span className="ms-1 opacity-75">{retweetCount}</span>
//                         </span>
//                     </div>
//                 </div>
//             </div>
                
            
//         </div>
//     )
// }

export {TweetListView, TweetCard};