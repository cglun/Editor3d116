import { ButtonGroup, ListGroup, ProgressBar } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { getButtonColor } from "../../app/config";
import { useRef, useState } from "react";
import Toast3d from "../common/Toast3d";
import { setClassName } from "../../app/utils";

export function UploadModel() {
  const color = getButtonColor();
  let fileRef = useRef<any>(null);
  const [curFile, setCurFile] = useState<File | null>(null);
  const [btn, setBtn] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(100);
  function handleUpload() {
    // if (progress < 100) {
    //   Toast3d("上传中……");
    //   return;
    // }
    if (curFile) {
      //上传文件
      setProgress(30);
    }
  }

  return (
    <div className="d-flex">
      <ListGroup.Item>
        {btn ? (
          <Form.Group controlId="formFile">
            <Form.Label className="custom-file-progress d-flex align-items-center">
              <i
                style={{ fontSize: "1.4rem" }}
                className={setClassName("cloud-plus")}
              ></i>
              <div className="ms-1">模型</div>
            </Form.Label>
            <Form.Control
              as="input"
              style={{ display: "none" }}
              type="file"
              ref={fileRef}
              accept=".glb,.gltf,.png,.jpg"
              onChange={() => {
                if (fileRef.current.files.length > 0) {
                  const curFile = fileRef.current.files[0];
                  setCurFile(curFile);
                  setBtn(false);
                } else {
                  setBtn(true);
                }
              }}
            />
          </Form.Group>
        ) : (
          <>
            <Form.Text>{curFile?.name}</Form.Text>
            {progress < 100 && <ProgressBar now={progress} label={progress} />}
          </>
        )}
      </ListGroup.Item>
      <ListGroup.Item>
        <ButtonGroup size="sm">
          <Button
            variant={color}
            id="button-addon1"
            disabled={btn}
            onClick={() => {
              //fileRef.current.value = "";

              if (progress) {
                Toast3d("上传中……");
                return;
              }
              setBtn(true);
            }}
          >
            清空
          </Button>
          <Button
            variant={color}
            id="button-addon2"
            onClick={() => {
              handleUpload();
            }}
            disabled={btn}
          >
            上传
          </Button>
        </ButtonGroup>
      </ListGroup.Item>
    </div>
  );
}
