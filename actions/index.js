"use server";

import { prisma } from "@/lib/prismaClient"; // Fixed typo: prismaClinet -> prismaClient
import { redirect } from "next/navigation";

export const addPost = async (prevState, formData) => {
  const title = formData.get("title");
  const authorEmail = formData.get("author");
  const content = formData.get("content");
  const slug = title?.replace(/\s+/g, "-").toLowerCase() || "";

  if (!title) {
    return { error: "Title is required" };
  }

  if (!content) {
    return { error: "Content is required" };
  }

  if (!authorEmail) {
    return { error: "Author email is required" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
      select: {
        id: true,
      },
    });

    // Check if user exists
    if (!user) {
      return { error: "User not found" };
    }

    await prisma.post.create({
      data: {
        title: title,
        content: content,
        slug: slug,
        authorId: user.id, // Use user.id instead of user
      },
    });

  } catch (error) {
    // Handle unique constraint violation for slug
    if (error.code === 'P2002') {
      return { error: "A post with this title already exists" };
    }
  }

  redirect("/");
};

export const editPostAction = async (formData) => {
  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content");
  const slug = title?.replace(/\s+/g, "-").toLowerCase() || "";

  if (!title) {
    return { error: "Title is required" };
  }

  if (!content) {
    return { error: "Content is required" };
  }

  try {
    await prisma.post.update({
      // Changed Post to post (lowercase)
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        slug: slug,
      },
    });
  } catch (error) {
    return { error: error.message };
  }
  redirect(`/${id}`);
};

export const deletePostAction = async (formData) => {
  const id = formData.get("id");

  if (!id) {
    return { error: "ID is required" };
  }

  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return { error: error.message };
  }

  redirect("/"); // Redirect after successful deletion
};
