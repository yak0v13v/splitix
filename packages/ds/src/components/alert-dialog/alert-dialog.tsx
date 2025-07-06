import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
} from "@radix-ui/react-alert-dialog";
import styles from "./alert-dialog.module.css";

const AlertDialog = () => {
  console.log(styles);
  return (
    <Root>
      <Trigger />
      <Portal>
        <Overlay className={styles.overlay} />
        <Content className={styles.content}>
          <Title className={styles.title}>Title</Title>
          <Description className={styles.description}>Description</Description>
          <Cancel>
            <div>Cancel</div>
          </Cancel>
          <Action onClick={(e) => e.preventDefault()}>Action</Action>
        </Content>
      </Portal>
    </Root>
  );
};

export { AlertDialog };
