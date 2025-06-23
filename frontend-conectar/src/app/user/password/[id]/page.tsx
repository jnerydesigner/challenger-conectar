interface Props {
  params: { id: string };
}

export default async function ChangePasswordUserPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <h1>Mudar senha</h1>
      <p>ID do usuário: {id}</p>
    </div>
  );
}
