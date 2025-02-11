import { memo } from "react";
import { Button, ButtonGroup, Card, Container, Spinner } from "react-bootstrap";
import AlertBase from "../common/AlertBase";
import { getThemeColor } from "../../app/config";
import { setClassName } from "../../app/utils";
import { APP_COLOR } from "../../app/type";
import ModalConfirm3d from "../common/ModalConfirm3d";
import Toast3d from "../common/Toast3d";
import EditorForm from "../common/EditorForm";

export interface ItemInfo {
  id: number;
  name: string;
  type: string;
  desc: string;
  imgUrl: string;
}

interface Props {
  list: ItemInfo[];
  setList: (list: ItemInfo[]) => void;
  getType: {
    isLoading: boolean;
    error: boolean;
  };
}
function ItemInfoCard(props: Props) {
  const { list, getType, setList } = props;

  const { isLoading, error } = getType;
  //加载中……
  if (isLoading) {
    return <Spinner animation="grow" />;
  }
  //错误
  if (error) {
    console.error(error);
    return <AlertBase type={APP_COLOR.Danger} text={"查看控制台"} />;
  }
  //无数据
  if (list.length === 0) {
    return <AlertBase type={APP_COLOR.Warning} text={"无数据"} />;
  }

  function deleteBtn(item: ItemInfo, index: number) {
    ModalConfirm3d(
      {
        title: "删除",
        body: <AlertBase type={APP_COLOR.Danger} text={item.name} />,
      },
      () => {
        const newList = list.filter((_, i) => i !== index);

        setList(newList);
        Toast3d(`【${item.name}】已删除`);
      }
    );
  }

  function editorBtn(item: ItemInfo, _index: number) {
    function getNewItem(_newItem: ItemInfo) {
      console.log("getNewItem", _newItem);

      const newList = list.map((item, index) => {
        if (index === _index) {
          return _newItem;
        }
        return item;
      });
      setList(newList);
    }

    ModalConfirm3d(
      {
        title: "编辑",
        body: <EditorForm item={item} getNewItem={getNewItem} />,
      },
      () => {
        Toast3d(`【${item.name}】已修改 `);
      }
    );
  }

  return (
    <Container fluid className="d-flex flex-wrap">
      {list.map((item: ItemInfo, index: number) => {
        return (
          <Card className="ms-2 mt-2" key={index}>
            <Card.Header style={{ width: "6rem" }} title={item.name}>
              {item.name.trim() === "" ? (
                <span className="text-warning"> 未命名</span>
              ) : (
                item.name
              )}
            </Card.Header>
            <Card.Body className="d-flex flex-column text-center">
              {item.imgUrl.trim() !== "" ? (
                <Card.Img src={item.imgUrl} variant="top" />
              ) : (
                <i className="bi bi-image" style={{ fontSize: "4rem" }}></i>
              )}

              <ButtonGroup aria-label="Basic example" className="mt-2">
                <Button
                  variant={getThemeColor()}
                  size="sm"
                  onClick={() => editorBtn(item, index)}
                >
                  <i className={setClassName("pencil")} title="编辑"></i>
                </Button>
                <Button
                  variant={getThemeColor()}
                  size="sm"
                  onClick={() => deleteBtn(item, index)}
                >
                  <i className={setClassName("trash")} title="删除"></i>
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
}
export default memo(ItemInfoCard);
