import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buscar todos os produtos (GET)
export async function GET() {
  try {
    const produtos = await prisma.produto.findMany();
    return Response.json(produtos);
  } catch (error) {
    return Response.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

// Criar um novo produto (POST)
export async function POST(req) {
  try {
    const body = await req.json();
    const novoProduto = await prisma.produto.create({
      data: body,
    });
    return Response.json(novoProduto);
  } catch (error) {
    return Response.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}

// Atualizar um produto existente (PUT)
export async function PUT(req) {
  try {
    const body = await req.json();
    
    if (!body.id) {
      return Response.json({ error: "ID do produto é obrigatório" }, { status: 400 });
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(body.id) }, // Garante que o ID seja um número
      data: body,
    });

    return Response.json(produtoAtualizado);
  } catch (error) {
    return Response.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

// Deletar um produto (DELETE)
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return Response.json({ error: "ID do produto é obrigatório" }, { status: 400 });
    }

    await prisma.produto.delete({
      where: { id: Number(id) }, // Converte para número
    });

    return Response.json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    return Response.json({ error: "Erro ao deletar produto" }, { status: 500 });
  }
}
