const ShowVideo = (props: any) => {
  const video = props.list.video_files[0];
  const videoPicture = props.list.video_pictures[0].picture;

  return (
    <div>
      <video
        id="my-video"
        autoPlay
        muted
        className="video-js "
        controls
        preload="auto"
        width="640"
        height="264"
        poster={videoPicture}
        data-setup="{}"
      >
        <source src={video.link} type={video.file_type} />
      </video>
    </div>
  );
};

export default ShowVideo;
