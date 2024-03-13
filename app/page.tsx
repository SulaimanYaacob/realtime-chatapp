"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  AppShell,
  AppShellMain,
  Avatar,
  Button,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { isNotEmpty, useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";

export default function Home() {
  const user = useQuery(api.users.default);
  const createMessage = useMutation(api.messages.createMessage);
  const { getInputProps, onSubmit } = useForm({
    initialValues: { text: "" },
    validate: { text: isNotEmpty() },
  });
  const getMessages = useQuery(api.messages.getMessages);
  const { height, width } = useViewportSize();

  if (!getMessages)
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );

  return (
    <AppShell>
      <AppShellMain>
        <Container pos="relative" size="sm" py="xl">
          <Stack gap="xs">
            <Group justify="space-between">
              <Group>
                <Avatar src={user?.pictureUrl} />
                <Text>{user ? user.name : "Anonymous"}</Text>
              </Group>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline">Sign In</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <Button variant="outline">Sign Out</Button>
                </SignOutButton>
              </SignedIn>
            </Group>

            <ScrollArea h={height - 175}>
              <Paper withBorder p="xs">
                <Stack>
                  {getMessages?.map(
                    ({ _id, text, pictureUrl, name, userId }) => (
                      <Paper
                        bg={
                          userId === user?.tokenIdentifier ? "gray" : undefined
                        }
                        shadow="xs"
                        ta={userId === user?.tokenIdentifier ? "end" : "start"}
                        key={_id}
                        withBorder
                        p="xs"
                      >
                        <Stack
                          align={
                            userId === user?.tokenIdentifier ? "end" : "start"
                          }
                        >
                          <Group gap="xs">
                            <Avatar
                              display={
                                userId === user?.tokenIdentifier
                                  ? "none"
                                  : "block"
                              }
                              src={pictureUrl}
                            />
                            <Text>{name}</Text>
                            <Avatar
                              display={
                                userId === user?.tokenIdentifier
                                  ? "block"
                                  : "none"
                              }
                              src={pictureUrl}
                            />
                          </Group>
                          <Text>{text}</Text>
                        </Stack>
                      </Paper>
                    )
                  )}
                </Stack>
              </Paper>
            </ScrollArea>
            <form onSubmit={onSubmit(({ text }) => createMessage({ text }))}>
              <Grid gutter="xs">
                <GridCol span="auto">
                  <TextInput
                    {...getInputProps("text")}
                    placeholder="Type anything here!"
                  />
                </GridCol>
                <GridCol span="content">
                  <Button type="submit" variant="light">
                    Send
                  </Button>
                </GridCol>
              </Grid>
            </form>
          </Stack>
        </Container>
      </AppShellMain>
    </AppShell>
  );
}
