import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { open } from "ionicons/icons";
import { useEffect } from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    if ("launchQueue" in window && "LaunchParams" in window) {
      (window as any).launchQueue.setConsumer(
        (launchParams: { files: any[] }) => {
          for (const fileHandle of launchParams.files) {
            openNotebookFile(fileHandle);
          }
        }
      );
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => openNotebookFile()}>
              <IonIcon slot="icon-only" icon={open}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );

  async function openNotebookFile(fileHandle?: any) {
    if (!fileHandle) {
      [fileHandle] = await (window as any).showOpenFilePicker();
      if (!fileHandle) {
        return;
      }
    }
    const file = await fileHandle.getFile();
    const contents = await file.text();
    alert('file opened');
    alert(contents);
  }
};

export default Page;
