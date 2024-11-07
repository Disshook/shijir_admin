import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/third_party/font_awesome.min.js";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/css/plugins/video.min.css";
import "froala-editor/css/plugins/colors.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import React from "react";

// Define the expected structure of the API response
interface VideoUploadResponse {
  videoUrl: string;
}

type FroalaProps = {
  onValueChange: (data: string) => void;
  value: string;
};

const Froala = ({ onValueChange, value }: FroalaProps) => {
  const editorConfig = {
    pluginsEnabled: [
      "align",
      "charCounter",
      "codeBeautifier",
      "codeView",
      "colors",
      "draggable",
      "embedly",
      "emoticons",
      "entities",
      "file",
      "fontAwesome",
      "fontFamily",
      "fontSize",
      "fullscreen",
      "image",
      "imageManager",
      "inlineStyle",
      "lineBreaker",
      "link",
      "lists",
      "paragraphFormat",
      "paragraphStyle",
      "quote",
      "save",
      "table",
      "url",
      "video",
      "wordPaste",
    ],
    toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "fontFamily",
      "fontSize",
      "color",
      "inlineStyle",
      "paragraphStyle",
      "|",
      "paragraphFormat",
      "align",
      "formatOL",
      "formatUL",
      "outdent",
      "indent",
      "-",
      "undo",
      "redo",
      "insertLink",
      "insertImage",
      "insertVideo",
      "embedly",
      "insertFile",
      "insertTable",
      "|",
      "emoticons",
      "specialCharacters",
      "insertHR",
      "selectAll",
      "clearFormatting",
      "|",
      "print",
      "help",
      "html",
      "fullscreen",
    ],
    // Define custom font family options
    fontFamily: {
      "Arial,Helvetica,sans-serif": "Arial",
      "Georgia,serif": "Georgia",
      "Impact,Charcoal,sans-serif": "Impact",
      "Tahoma,Geneva,sans-serif": "Tahoma",
      "'Times New Roman',Times,serif": "Times New Roman",
      "Verdana,Geneva,sans-serif": "Verdana",
      "'Courier New',Courier,monospace": "Courier New",
    },
    fontSize: [
      "8",
      "10",
      "12",
      "14",
      "18",
      "24",
      "30",
      "36",
      "48",
      "60",
      "72",
      "96",
    ],
    heightMin: 300,
    heightMax: 600,
    imageUpload: true, // Allow image upload
    videoUpload: true, // Allow video upload

    // Custom video upload URL
    videoUploadURL: "https://order.tanuweb.cloud/api/v1/upload",
    // You can customize the parameter for video upload
    videoUploadParam: "upload",
    videoMaxSize: 500 * 1024 * 1024, // 50 MB limit

    // Response handling with editor instance
    events: {
      "video.uploaded": function (response: string, editor: any) {
        const videoResponse: VideoUploadResponse = JSON.parse(response);
        if (videoResponse.videoUrl) {
          // Use the editor instance to insert the video URL
          editor.video.insert(videoResponse.videoUrl);
        }
      },
      "video.error": function (error: any) {
        console.error("Video upload failed:", error);
      },
    },
  };

  return (
    <div className="w-full]">
      <FroalaEditorComponent
        tag="textarea"
        config={editorConfig}
        model={value}
        onModelChange={onValueChange}
      />
    </div>
  );
};

export default Froala;
