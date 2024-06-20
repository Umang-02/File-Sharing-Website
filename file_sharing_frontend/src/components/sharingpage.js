import React, { useLayoutEffect, useState } from "react";
import "../components/sharingpage.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import bgimg from "./filesharebg.png";

//Importing react-toastify for error and success popups.
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { injectStyle } from "react-toastify/dist/inject-style";

//Importing the react filepond
import { FilePond, registerPlugin } from "react-filepond";
import Popup from "./popup";
import Alert from "react-bootstrap/Alert";

//Importing filepond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
var imagesize = 0,
  totsize = 0,
  videosize = 0;
function FilePondUpload() {
  const [imgsize, setSize] = useState(0);
  const [totalsize, setTotalSize] = useState(0);
  const [files, setFiles] = useState([]);
  const [folderid, findid] = useState("");
  const [popup, showPopUp] = useState(false);

  const uploadfiles = () => {
    var formdata = new FormData();
    files.forEach((file) => {
      formdata.append("files", file.file);
      setTotalSize((ts) => ts + file.file.size / 1000000);
      if (
        file.file.name.includes(".jpg") ||
        file.file.name.includes(".jpeg") ||
        file.file.name.includes(".png") ||
        file.file.name.includes(".gif")
      ) {
        setSize((im) => im + file.file.size / 1000000);
      }
      console.log(imgsize);
    });
    
    if (files.length == 0) {
      toast.error("Import files before uploading!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } else {
      fetch("http://127.0.0.1:8000/handle/", {
        method: "POST",
        headers: { "X-CSRFToken": "{{csrf_token}}" },
        body: formdata,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          findid(result.data.folder);
        });
      toast.success("Your files have been successfully uploaded!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //   success[0].style.display = "block";
      // downloadpath='http://127.0.0.1:8000/file_sharing_frontend/build/static/zip/{folderid}.zip'
    }
  };
  function copyClip() {
    // copyText.select();
    // copyText.setSelectionRange(0,99999);

    if(files.length==0)
    {
        toast.error("Upload files before downloading!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    }

    else
    {
        navigator.clipboard.writeText(
            `http://127.0.0.1:8000/static/zip/${folderid}.zip`
        );

        toast.success("URL has been copied successfully!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    }
  }
  function downloadButton(){
    
  }
  console.log(folderid);
  return (
    <>
      <div className="filepond">
        <FilePond
          allowMultiple={true}
          files={files}
          maxFiles={400}
          onupdatefiles={setFiles}
          allowReorder={true}
          // server="http://127.0.0.1:8000/handle" // File upload api goes here
        />
        <button className="submission" onClick={uploadfiles}>
          Upload Files
        </button>
        <a
          href={`http://127.0.0.1:8000/static/zip/${folderid}.zip`}
          target="_blank"
        >
          <button className="download">Download Files</button>
        </a>
        <button className="linkcopy" onClick={copyClip}>
          Copy download link
        </button>
      </div>
      {/* <div className="success">Files has been uploaded successfully.</div>
      <div className="fail">Import files before uploading.</div> */}
      {/* <div className="progressbar">
                    <div className="imageprogress">
                        <span className="imagevalue">{((imgsize/totalsize)*100).toFixed(2)}%</span>
                    </div>
                </div> */}
      {popup && <Popup></Popup>}
      <ToastContainer
        limit={3}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </>
  );
}

const sharing = () => {
  return (
    <>
      <div className="body">
        <div className="left-text">
          <img src={bgimg} />
        </div>
        <div className="boxforupload">
          <div className="text">
            <h2>Upload Files</h2>
            <p>Easy.Fast.Secure</p>
          </div>
          <div className="uploadfiles">
            <FilePondUpload />
          </div>
        </div>
      </div>
    </>
  );
};

export default sharing;
