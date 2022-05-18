import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
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
            console.log(fileHandle);
            alert("app launched by file");
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
};

export default Page;
