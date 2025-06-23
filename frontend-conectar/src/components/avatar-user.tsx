import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDataCookie } from "@/types/user-data-cookie";
import { fallbackNameCreate } from "@/utils/fallback-name";

interface UserProps {
  user: UserDataCookie;
  className: string;
}

export function AvatarUser({ user, className }: UserProps) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar className={className}>
        {user?.avatar ? (
          <AvatarImage src={user?.avatar} alt={user?.name} />
        ) : (
          <AvatarFallback>{fallbackNameCreate(user?.name)}</AvatarFallback>
        )}
      </Avatar>
    </div>
  );
}
