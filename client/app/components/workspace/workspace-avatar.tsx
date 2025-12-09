const WorkspaceAvatar = ({ color, name }: { color: string; name: string }) => {
  return (
    <div
      className="w-6 h-6 rounded  flex items-center justify-center"
      style={{ background: color }}
    >
      <span className="text-xs font-medium text-primary-foreground">
        {name.charAt(0).toLocaleUpperCase()}
      </span>
    </div>
  );
};

export default WorkspaceAvatar;
