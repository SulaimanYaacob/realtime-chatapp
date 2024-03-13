"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  AppShell,
  AppShellMain,
  Avatar,
  Button,
  Container,
  Grid,
  GridCol,
  Group,
  Paper,
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

export default function Home() {
  const user = useQuery(api.users.default);
  const createMessage = useMutation(api.messages.createMessage);
  const { getInputProps, onSubmit } = useForm({
    initialValues: { text: "" },
    validate: { text: isNotEmpty() },
  });
  const getMessages = useQuery(api.messages.getMessages);
  console.log({ getMessages });

  return (
    <AppShell>
      <AppShellMain>
        <Container size="xs" py="xl">
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
                    Sent
                  </Button>
                </GridCol>
              </Grid>
            </form>
            <Paper withBorder p="xs">
              <Stack>
                {getMessages?.map(({ _id, text, pictureUrl, name }) => (
                  <Paper key={_id} withBorder p="xs">
                    <Stack>
                      <Group gap="xs">
                        <Avatar src={pictureUrl} />
                        <Text>{name}</Text>
                      </Group>
                      <Text>{text}</Text>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </AppShellMain>
    </AppShell>
  );
}
