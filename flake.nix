{
  nixConfig = {
    extra-substituters = "https://nexus.gsmlg.net/repository/nix-cache/";
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = {
    systems,
    nixpkgs,
    ...
  } @ inputs: let
    eachSystem = f:
      nixpkgs.lib.genAttrs (import systems) (
        system:
          f nixpkgs.legacyPackages.${system}
      );
  in {
    devShells = eachSystem (pkgs: {
      default = pkgs.mkShell {
        name = "Duskmoon Dev Shell";

        buildInputs = [
          pkgs.figlet

          pkgs.esbuild
          pkgs.tailwindcss
          pkgs.bun

          pkgs.nodejs_20

          pkgs.nodePackages.pnpm
          pkgs.nodePackages.npm-check-updates

          pkgs.nodePackages.typescript
          pkgs.nodePackages.typescript-language-server
        ];

        shellHook = ''
          figlet -w 120 -f starwars Duskmoon
          figlet -w 120 -f starwars Dev Shell
          export EDITOR=vim
        '';
      };
    });
  };
}
